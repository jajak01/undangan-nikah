/**
 * Minimal static server with SPA fallback (no dependencies).
 *
 * Serves files from the project root and, for any path that does not map to a
 * real file (e.g. /keluarga-besar-dawam), falls back to index.html so each
 * guest can open their personal invitation link locally.
 *
 * Run:  node serve.js
 * Then: http://localhost:3000/keluarga-besar-dawam
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

http.createServer((req, res) => {
  const rawPath = (req.url || '/').split('?')[0].split('#')[0];
  let urlPath;
  try {
    urlPath = decodeURIComponent(rawPath);
  } catch (e) {
    urlPath = rawPath;
  }

  let filePath = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);

  // Block path traversal outside ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream'
      });
      return fs.createReadStream(filePath).pipe(res);
    }

    // SPA fallback: serve index.html for unknown routes (personal guest links)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.createReadStream(path.join(ROOT, 'index.html')).pipe(res);
  });
}).listen(PORT, () => {
  console.log(`Undangan nikah served at http://localhost:${PORT}`);
  console.log(`Contoh link tamu: http://localhost:${PORT}/keluarga-besar-dawam`);
});
