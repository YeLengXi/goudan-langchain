const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.argv.slice(2).find(arg => arg.startsWith('--port')).split('=')[1] || 8080;
const DIR = process.argv.slice(2).find(arg => arg.startsWith('--dir')).split('=')[1] || './public';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const filePath = path.join(DIR, parsedUrl.pathname);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found
');
      return;
    }

    if (stats.isDirectory()) {
      filePath += '/index.html';
      fs.stat(filePath, (err, stats) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found
');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      const mime = getMime(filePath);
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpeg';
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

server.listen(PORT, () => {
  console.log(`Starting HTTP server...
- Port: ${PORT}
- Root: ${DIR}
- URL: http://localhost:${PORT}
`);
});
