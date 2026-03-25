const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8080;
const rootDir = './public';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const filePath = path.join(rootDir, parsedUrl.pathname);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found
');
      return;
    }

    if (stats.isDirectory()) {
      filePath += '/index.html';
      fs.stat(filePath, (err, stats) => {
        if (err) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('404 Not Found
');
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', getMimeType(filePath));
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

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
      return 'image/' + ext.substring(1);
    default:
      return 'application/octet-stream';
  }
}

server.listen(port, hostname, () => {
  console.log(`Starting HTTP server...
- Port: ${port}
- Root: ${rootDir}
- URL: http://${hostname}:${port}
`);
});
