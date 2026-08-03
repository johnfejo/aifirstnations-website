// ================================================================
// AI FIRST NATIONS — QUOTE REQUEST HANDLER
// Vercel Serverless Function  →  save this as:  api/contact.js
//
// Receives submissions from request-quote.html and emails them to John
// via Resend (https://resend.com).
//
// Required Vercel Environment Variables:
//   RESEND_API_KEY     — API key from resend.com
//   QUOTE_TO_EMAIL      — where quote requests are delivered (defaults to
//                         john.aifirstnations@gmail.com if unset)
//   RESEND_FROM_EMAIL   — verified sender, e.g. "AI First Nations <quotes@aifirstnations.org.au>"
//                         (defaults to Resend's shared sandbox sender, which
//                         works without domain verification but is best
//                         replaced once the aifirstnations.org.au domain is
//                         verified in Resend)
// ================================================================

// ── ORIGIN ALLOWLIST ────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://aifirstnations.org.au',
  'https://aifirstnations-website-glfr.vercel.app',
];

// ── SIMPLE IN-MEMORY RATE LIMITER ────────────────────────────────
// Best-effort, per-instance only (see api/ai.js for the same caveat) —
// bounds how many submissions one source can send until a durable
// store-backed limiter replaces this.
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map(); // ip -> { count, windowStart }

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const entry = requestLog.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.windowStart > RATE_WINDOW_MS) {
    requestLog.delete(ip);
    return false;
  }
  return entry.count >= MAX_REQUESTS_PER_WINDOW;
}

function recordRequest(ip) {
  const now = Date.now();
  const entry = requestLog.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    requestLog.set(ip, { count: 1, windowStart: now });
  } else {
    entry.count++;
  }
  if (requestLog.size > 1000) {
    requestLog.delete(requestLog.keys().next().value);
  }
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.setHeader('Retry-After', '600');
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
  recordRequest(ip);

  // Parse body — handle both pre-parsed objects and raw strings
  let parsed = {};
  try {
    if (req.body && typeof req.body === 'object') {
      parsed = req.body;
    } else if (req.body && typeof req.body === 'string') {
      parsed = JSON.parse(req.body);
    } else {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString();
      if (raw) parsed = JSON.parse(raw);
    }
  } catch { parsed = {}; }

  const { name, organisation, email, phone, address, preferredDates, siteLocation, details, source } = parsed;

  if (!name || !email || !details) {
    return res.status(400).json({ error: 'Name, email and job details are required' });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Server not configured: missing RESEND_API_KEY environment variable' });
  }

  const toEmail = process.env.QUOTE_TO_EMAIL || 'john.aifirstnations@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'AI First Nations Website <onboarding@resend.dev>';

  const html = `
    <h2>New quote request — AI First Nations website</h2>
    ${source ? `<p><b>Source:</b> ${escapeHtml(source)}</p>` : ''}
    <table cellpadding="6" cellspacing="0">
      <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><b>Organisation</b></td><td>${escapeHtml(organisation)}</td></tr>
      <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><b>Phone</b></td><td>${escapeHtml(phone)}</td></tr>
      <tr><td><b>Address</b></td><td>${escapeHtml(address)}</td></tr>
      <tr><td><b>Preferred date(s)</b></td><td>${escapeHtml(preferredDates)}</td></tr>
      <tr><td><b>Site location</b></td><td>${escapeHtml(siteLocation)}</td></tr>
    </table>
    <p><b>What they'd like AI First Nations to do:</b></p>
    <p>${escapeHtml(details).replace(/\n/g, '<br>')}</p>
  `;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Quote request from ${name}${organisation ? ' (' + organisation + ')' : ''}${source ? ' — via ' + source : ''}`,
        html,
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      console.error('[api/contact] Resend error', r.status, JSON.stringify(data));
      return res.status(r.status).json({ error: (data.message) || 'Failed to send quote request' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[api/contact]', err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
};
