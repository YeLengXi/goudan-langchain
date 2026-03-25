const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.argv[2] || 8080;
const DIR = process.argv[3] || './public';

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
        res.end(fs.readFileSync(filePath, 'utf-8'));
      });
    } else {
      serveFile(filePath, stats, res);
    }
  });
});

function serveFile(filePath, stats, res) {
  const mimeType = getMimeType(filePath);
  res.writeHead(200, { 'Content-Type': mimeType });
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.json':
      return 'application/json';
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.gif':
    case '.svg':
      return 'image/' + ext.replace(/./, m => m === 'jpeg' ? 'jpg' : m);
    default:
      return 'application/octet-stream';
  }
}

server.listen(PORT, () => {
  console.log(`Starting HTTP server...
- Port: ${PORT}
- Root: ${DIR}
- URL: http://localhost:${PORT}
Press Ctrl+C to stop
`);
});
