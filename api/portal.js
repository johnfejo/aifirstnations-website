// ================================================================
// AI FIRST NATIONS — CLIENT DATA PORTAL API
// Vercel Serverless Function  →  save this as:  api/portal.js
//
// Required Vercel Environment Variables:
//   B2_KEY_ID       — Backblaze application key ID
//   B2_APP_KEY      — Backblaze application key
//   B2_BUCKET_NAME  — aifn-flight-data
// ================================================================

// ── CLIENT REGISTRY ─────────────────────────────────────────────
// Add new clients here. prefix = their top-level B2 folder.
const CLIENTS = {
  'GOON-WET-2026': {
    name:   'Goondoi Rangers',
    org:    'Goondoi Land & Sea Rangers',
    prefix: 'Goondoi/',
    logo:   '/images/goondoi.jpg',
  },
  'TSC-HORN-2026': {
    name:   'Torres Shire Council',
    org:    'Horn Island Aerial Survey — Torres Strait',
    prefix: 'Horn-Island/',
    logo:   'https://saltymonkeys.com.au/wp-content/uploads/2023/10/logo.svg',
  },
  'RMIT-MANGROVE-2026': {
    name:   'AI First Nations Mangrove Species Identification System',
    org:    'RMIT University Pilot — Cairns Region Mangrove Survey',
    prefix: 'RMIT-Mangrove-AI/',
    logo:   null,
  },
};

// ── DISPLAY NAME OVERRIDES ───────────────────────────────────────
// Maps a normalised B2 folder slug to a friendly display name.
// Normalisation strips spaces, hyphens and underscores then lowercases,
// so "1 RILEY STREET", "1-Riley-Street" and "1_riley_street" all match.
const DISPLAY_NAMES = {
  '1rileystreet': '1 Riley Street / Warrina Lakes',
  'yellowmangroves': 'Yellow Mangroves',
  'orangemangroves': 'Orange Mangroves',
  'redmangroves': 'Red Mangroves',
};

function friendlyName(raw) {
  const key = raw.toLowerCase().replace(/[\s\-_]+/g, '');
  return DISPLAY_NAMES[key] || raw.replace(/-/g, ' ');
}

// ── B2 HELPERS ──────────────────────────────────────────────────
async function b2Auth() {
  const creds = Buffer.from(
    `${process.env.B2_KEY_ID}:${process.env.B2_APP_KEY}`
  ).toString('base64');

  const r = await fetch(
    'https://api.backblazeb2.com/b2api/v2/b2_authorize_account',
    { headers: { Authorization: `Basic ${creds}` } }
  );
  if (!r.ok) throw new Error('B2 auth failed: ' + (await r.text()));
  return r.json();
}

async function b2List(apiUrl, token, bucketId, prefix, delimiter) {
  const body = { bucketId, prefix, maxFileCount: 10000 };
  if (delimiter) body.delimiter = delimiter;

  const r = await fetch(`${apiUrl}/b2api/v2/b2_list_file_names`, {
    method:  'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) throw new Error('B2 list failed: ' + JSON.stringify(data));
  return data;
}

async function b2DownloadAuth(apiUrl, token, bucketId, prefix, seconds = 86400) {
  const r = await fetch(`${apiUrl}/b2api/v2/b2_get_download_authorization`, {
    method:  'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      bucketId,
      fileNamePrefix:         prefix,
      validDurationInSeconds: seconds,
    }),
  });
  return r.json();
}

function fmtSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let n = bytes;
  for (const u of units) {
    if (n < 1024) return `${n.toFixed(1)} ${u}`;
    n /= 1024;
  }
  return `${n.toFixed(1)} TB`;
}

// ── ORIGIN ALLOWLIST ────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://aifirstnations.org.au',
  'https://aifirstnations-website-glfr.vercel.app',
];

// ── SIMPLE IN-MEMORY RATE LIMITER ────────────────────────────────
// Best-effort: this Map lives in one serverless instance's memory, so it
// resets whenever that instance recycles or a request lands on a different
// instance. It still meaningfully raises the bar against a naive script
// hammering this endpoint from one place, but it is NOT a durable/global
// guarantee — swap in Vercel KV or Upstash Redis for that.
const FAILED_CODE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 8;
const failedAttempts = new Map(); // ip -> { count, windowStart }

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const entry = failedAttempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.windowStart > FAILED_CODE_WINDOW_MS) {
    failedAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILED_ATTEMPTS;
}

function recordFailedAttempt(ip) {
  const now = Date.now();
  const entry = failedAttempts.get(ip);
  if (!entry || now - entry.windowStart > FAILED_CODE_WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, windowStart: now });
  } else {
    entry.count++;
  }
  if (failedAttempts.size > 1000) {
    failedAttempts.delete(failedAttempts.keys().next().value);
  }
}

// ── HANDLER ─────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.setHeader('Retry-After', '900');
    return res.status(429).json({ error: 'Too many failed attempts. Try again in 15 minutes.' });
  }

  // Parse body — handle both pre-parsed objects and raw strings
  let parsed = {};
  try {
    if (req.body && typeof req.body === 'object') {
      parsed = req.body;
    } else if (req.body && typeof req.body === 'string') {
      parsed = JSON.parse(req.body);
    } else {
      // Manually read stream
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString();
      if (raw) parsed = JSON.parse(raw);
    }
  } catch { parsed = {}; }

  const { action, code, prefix } = parsed;
  const client = CLIENTS[(code || '').toUpperCase()];

  if (!client) {
    recordFailedAttempt(ip);
    console.warn('[portal-api] invalid access code attempt from', ip);
    return res.status(401).json({ error: 'Invalid access code' });
  }
  failedAttempts.delete(ip);

  try {
    const auth = await b2Auth();
    const { apiUrl, authorizationToken: token, downloadUrl } = auth;
    const bucketId   = auth.allowed.bucketId;
    const bucketName = process.env.B2_BUCKET_NAME || 'aifn-flight-data';

    // ── B2 folder helper ─────────────────────────────────────────
    function getFolders(data) {
      const fromFolders = data.folders || [];
      const fromMarkers = (data.files || [])
        .filter(f => f.fileName.endsWith('/'))
        .map(f => f.fileName);
      return [...new Set([...fromFolders, ...fromMarkers])].sort();
    }

    // ── action: projects ────────────────────────────────────────
    if (action === 'projects') {
      const data     = await b2List(apiUrl, token, bucketId, client.prefix, '/');
      const folders  = getFolders(data);
      const projects = folders.map(folder => {
        const slug = folder.replace(client.prefix, '').replace(/\/$/, '');
        return {
          name:   friendlyName(slug),
          slug,
          prefix: folder,
        };
      });
      return res.json({
        client: { name: client.name, org: client.org, logo: client.logo || null },
        projects,
      });
    }

    // ── action: flights ─────────────────────────────────────────
    if (action === 'flights') {
      const dateData = await b2List(apiUrl, token, bucketId, prefix, '/');
      const dates    = getFolders(dateData);

      const flights = [];
      for (const dateFolder of dates) {
        const dateStr  = dateFolder.replace(prefix, '').replace(/\/$/, '');
        const siteData = await b2List(apiUrl, token, bucketId, dateFolder, '/');
        const sites    = getFolders(siteData).map(sf => {
          const slug = sf.replace(dateFolder, '').replace(/\/$/, '');
          return {
            name:   friendlyName(slug),
            prefix: sf,
          };
        });
        flights.push({ date: dateStr, prefix: dateFolder, sites });
      }

      flights.sort((a, b) => b.date.localeCompare(a.date));
      return res.json({ flights });
    }

    // ── action: summary ─────────────────────────────────────────
    if (action === 'summary') {
      const data  = await b2List(apiUrl, token, bucketId, prefix, null);
      const files = (data.files || []).filter(f => {
        const rel = f.fileName.replace(prefix, '');
        return !rel.startsWith('.') && !rel.startsWith('._') && !rel.endsWith('/');
      });

      const types = {};
      let totalSize = 0;

      for (const f of files) {
        const ext = (f.fileName.split('.').pop() || 'other').toUpperCase();
        if (!types[ext]) types[ext] = { count: 0, size: 0 };
        types[ext].count++;
        types[ext].size += f.contentLength;
        totalSize += f.contentLength;
      }

      return res.json({
        fileCount:    files.length,
        totalSize,
        totalSizeFmt: fmtSize(totalSize),
        types,
      });
    }

    // ── action: file-list ────────────────────────────────────────
    if (action === 'file-list') {
      const [fileData, dlAuth] = await Promise.all([
        b2List(apiUrl, token, bucketId, prefix, null),
        b2DownloadAuth(apiUrl, token, bucketId, prefix, 86400),
      ]);

      const files = (fileData.files || [])
        .filter(f => {
          const rel = f.fileName.replace(prefix, '');
          return !rel.startsWith('.') && !rel.startsWith('._') && !rel.endsWith('/');
        })
        .map(f => ({
          name:    f.fileName.replace(prefix, ''),
          size:    f.contentLength,
          sizeFmt: fmtSize(f.contentLength),
          url:     `${downloadUrl}/file/${bucketName}/${f.fileName}?Authorization=${dlAuth.authorizationToken}`,
        }));

      return res.json({ files, expiresIn: '24 hours' });
    }

    return res.status(400).json({ error: 'Unknown action' });

  } catch (err) {
    console.error('[portal-api]', err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
};
