// ================================================================
// AI FIRST NATIONS — SHARED AI PROXY
// Vercel Serverless Function  →  save this as:  api/ai.js
//
// Keeps the Anthropic API key server-side only. Used by:
//   - portal.html      (Digital Admin)
//   - advisory.html    (Advisory Board)
//   - marketing.html   (Marketing Assistant)
//
// Required Vercel Environment Variable:
//   ANTHROPIC_API_KEY  — your Claude API key from console.anthropic.com
// ================================================================

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

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

  const { system, messages, max_tokens } = parsed;

  if (!messages || !Array.isArray(messages) || !messages.length) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Server not configured: missing ANTHROPIC_API_KEY environment variable' });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-8',
        max_tokens: max_tokens || 1000,
        system: system || '',
        messages,
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({ error: (data.error && data.error.message) || 'Anthropic API error' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('[api/ai]', err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
};
