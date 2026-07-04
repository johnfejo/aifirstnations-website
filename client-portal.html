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
};

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
  const body = { bucketId, prefix, maxFileCount: 1000 };
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

// ── HANDLER ─────────────────────────────────────────────────────
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
      // Manually read stream
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString();
      if (raw) parsed = JSON.parse(raw);
    }
  } catch { parsed = {}; }

  const { action, code, prefix } = parsed;
  const client = CLIENTS[(code || '').toUpperCase()];

  if (!client) return res.status(401).json({ error: 'Invalid access code' });

  try {
    const auth = await b2Auth();
    const { apiUrl, authorizationToken: token, downloadUrl } = auth;
    const bucketId   = auth.allowed.bucketId;
    const bucketName = process.env.B2_BUCKET_NAME || 'aifn-flight-data';

    // ── B2 folder helper ─────────────────────────────────────────
    // B2 returns virtual folders in data.folders (from delimiter grouping)
    // AND as folder-marker files in data.files (names ending with '/').
    // We merge both to handle all folder styles.
    function getFolders(data) {
      const fromFolders = data.folders || [];
      const fromMarkers = (data.files || [])
        .filter(f => f.fileName.endsWith('/'))
        .map(f => f.fileName);
      return [...new Set([...fromFolders, ...fromMarkers])].sort();
    }

    // ── action: projects ────────────────────────────────────────
    // Returns all project folders under the client's top-level prefix.
    // New project types appear automatically as B2 folders are created.
    if (action === 'projects') {
      const data     = await b2List(apiUrl, token, bucketId, client.prefix, '/');
      const folders  = getFolders(data);
      const projects = folders.map(folder => ({
        name:   folder.replace(client.prefix, '').replace(/\/$/, '').replace(/-/g, ' '),
        slug:   folder.replace(client.prefix, '').replace(/\/$/, ''),
        prefix: folder,
      }));
      return res.json({
        client: { name: client.name, org: client.org, logo: client.logo || null },
        projects,
      });
    }

    // ── action: flights ─────────────────────────────────────────
    // Returns date → sites list within a project prefix.
    if (action === 'flights') {
      const dateData = await b2List(apiUrl, token, bucketId, prefix, '/');
      const dates    = getFolders(dateData);

      const flights = [];
      for (const dateFolder of dates) {
        const dateStr  = dateFolder.replace(prefix, '').replace(/\/$/, '');
        const siteData = await b2List(apiUrl, token, bucketId, dateFolder, '/');
        const sites    = getFolders(siteData).map(sf => ({
          name:   sf.replace(dateFolder, '').replace(/\/$/, '').replace(/-/g, ' '),
          prefix: sf,
        }));
        flights.push({ date: dateStr, prefix: dateFolder, sites });
      }

      flights.sort((a, b) => b.date.localeCompare(a.date)); // newest first
      return res.json({ flights });
    }

    // ── action: summary ─────────────────────────────────────────
    // File count, total size, type breakdown for a site folder.
    if (action === 'summary') {
      const data  = await b2List(apiUrl, token, bucketId, prefix, null);
      // Exclude hidden/system files (Mac .Trashes, .fseventsd, etc.)
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
    // All files with 24-hour signed download URLs.
    if (action === 'file-list') {
      const [fileData, dlAuth] = await Promise.all([
        b2List(apiUrl, token, bucketId, prefix, null),
        b2DownloadAuth(apiUrl, token, bucketId, prefix, 86400),
      ]);

      // Exclude hidden/system files (Mac .Trashes, .fseventsd, etc.)
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
