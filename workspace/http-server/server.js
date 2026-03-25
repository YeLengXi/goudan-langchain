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

        fs.readFile(filePath, (err, content) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error
');
            return;
          }

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
        });
      });
    } else {
      serveFile(filePath, stats, res);
    }
  });
});

function serveFile(filePath, stats, res) {
  const mimeType = mime.getType(filePath);
  res.writeHead(200, { 'Content-Type': mimeType || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

function mime.getType(file) {
  try {
    const mime = require('mime-types');
    return mime.lookup(file) || 'application/octet-stream';
  } catch (error) {
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
