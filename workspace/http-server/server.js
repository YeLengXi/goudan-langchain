const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime');

const hostname = 'localhost';
const port = process.argv[2] || 8080;
const rootDir = process.argv[3] || './public';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const filePath = path.join(rootDir, parsedUrl.pathname);

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

        res.writeHead(200, { 'Content-Type': mime.getType(filePath) || 'text/plain' });
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.writeHead(200, { 'Content-Type': mime.getType(filePath) || 'text/plain' });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(port, () => {
  console.log(`Starting HTTP server...
- Port: ${port}
- Root: ${rootDir}
- URL: http://${hostname}:${port}
`);
});
