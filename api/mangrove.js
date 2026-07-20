// ================================================================
// AI FIRST NATIONS — RMIT MANGROVE AI FLIGHT DATA API
// Vercel Serverless Function  →  save this as:  api/mangrove.js
//
// Internal counterpart to api/portal.js — no access code required,
// since this is only ever called from the already-gated portal.html
// dashboard, not the public site. Same B2 bucket, fixed prefix per
// species instead of a per-client CLIENTS registry.
//
// Required Vercel Environment Variables (shared with api/portal.js):
//   B2_KEY_ID       — Backblaze application key ID
//   B2_APP_KEY      — Backblaze application key
//   B2_BUCKET_NAME  — aifn-flight-data
// ================================================================

// ── SPECIES REGISTRY ────────────────────────────────────────────
// prefix = top-level B2 folder for each mangrove species survey.
const SPECIES = {
  yellow: { name: 'Yellow Mangroves', prefix: 'RMIT-Mangrove-AI/Yellow-Mangroves/' },
  orange: { name: 'Orange Mangroves', prefix: 'RMIT-Mangrove-AI/Orange-Mangroves/' },
  red:    { name: 'Red Mangroves',    prefix: 'RMIT-Mangrove-AI/Red-Mangroves/' },
};

const DISPLAY_NAMES = {};
function friendlyName(raw) {
  const key = raw.toLowerCase().replace(/[\s\-_]+/g, '');
  return DISPLAY_NAMES[key] || raw.replace(/-/g, ' ');
}

// ── MESH / ORTHOMOSAIC DETECTION ────────────────────────────────
const MESH_EXTS = new Set(['OBJ', 'MTL', 'GLB', 'GLTF']);
const TEXTURE_EXTS = new Set(['PNG', 'JPG', 'JPEG']);
const ORTHO_EXTS = new Set(['TIF', 'TIFF']);

function classify(name) {
  const ext = (name.split('.').pop() || '').toUpperCase();
  const isTextureContext = /texturing|texture/i.test(name);
  if (MESH_EXTS.has(ext)) return 'mesh';
  if (isTextureContext && TEXTURE_EXTS.has(ext)) return 'texture';
  if (ORTHO_EXTS.has(ext)) return 'orthomosaic';
  return 'other';
}

// ── B2 HELPERS (identical to api/portal.js) ─────────────────────
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

function getFolders(data) {
  const fromFolders = data.folders || [];
  const fromMarkers = (data.files || [])
    .filter(f => f.fileName.endsWith('/'))
    .map(f => f.fileName);
  return [...new Set([...fromFolders, ...fromMarkers])].sort();
}

// ── HANDLER ─────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

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

  const { action, species, prefix } = parsed;

  try {
    const auth = await b2Auth();
    const { apiUrl, authorizationToken: token, downloadUrl } = auth;
    const bucketId   = auth.allowed.bucketId;
    const bucketName = process.env.B2_BUCKET_NAME || 'aifn-flight-data';

    // ── action: species ─────────────────────────────────────────
    // List all 3 species with a quick "has any flights" status.
    if (action === 'species') {
      const results = await Promise.all(
        Object.entries(SPECIES).map(async ([key, s]) => {
          const data    = await b2List(apiUrl, token, bucketId, s.prefix, '/');
          const folders = getFolders(data);
          return { key, name: s.name, prefix: s.prefix, flightCount: folders.length };
        })
      );
      return res.json({ species: results });
    }

    // ── action: flights ──────────────────────────────────────────
    // List date folders + site subfolders under a species prefix.
    if (action === 'flights') {
      const s = SPECIES[species];
      if (!s) return res.status(400).json({ error: 'Unknown species' });

      const dateData = await b2List(apiUrl, token, bucketId, s.prefix, '/');
      const dates    = getFolders(dateData);

      const flights = [];
      for (const dateFolder of dates) {
        const dateStr  = dateFolder.replace(s.prefix, '').replace(/\/$/, '');
        const siteData = await b2List(apiUrl, token, bucketId, dateFolder, '/');
        const sites    = getFolders(siteData).map(sf => {
          const slug = sf.replace(dateFolder, '').replace(/\/$/, '');
          return { name: friendlyName(slug), prefix: sf };
        });
        flights.push({ date: dateStr, prefix: dateFolder, sites });
      }

      flights.sort((a, b) => b.date.localeCompare(a.date));
      return res.json({ species: { key: species, name: s.name }, flights });
    }

    // ── action: summary ──────────────────────────────────────────
    if (action === 'summary') {
      const data  = await b2List(apiUrl, token, bucketId, prefix, null);
      const files = (data.files || []).filter(f => {
        const rel = f.fileName.replace(prefix, '');
        return !rel.startsWith('.') && !rel.startsWith('._') && !rel.endsWith('/');
      });

      const types = {};
      let totalSize = 0;
      let hasMesh = false;
      let hasOrtho = false;

      for (const f of files) {
        const ext = (f.fileName.split('.').pop() || 'other').toUpperCase();
        if (!types[ext]) types[ext] = { count: 0, size: 0 };
        types[ext].count++;
        types[ext].size += f.contentLength;
        totalSize += f.contentLength;

        const cls = classify(f.fileName);
        if (cls === 'mesh') hasMesh = true;
        if (cls === 'orthomosaic') hasOrtho = true;
      }

      return res.json({
        fileCount:    files.length,
        totalSize,
        totalSizeFmt: fmtSize(totalSize),
        types,
        hasMesh,
        hasOrtho,
      });
    }

    // ── action: file-list ─────────────────────────────────────────
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
          kind:    classify(f.fileName),
          url:     `${downloadUrl}/file/${bucketName}/${f.fileName}?Authorization=${dlAuth.authorizationToken}`,
        }));

      return res.json({ files, expiresIn: '24 hours' });
    }

    return res.status(400).json({ error: 'Unknown action' });

  } catch (err) {
    console.error('[mangrove-api]', err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
};
