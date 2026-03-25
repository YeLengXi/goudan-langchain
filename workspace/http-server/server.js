const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const hostname = '127.0.0.1';
const port = process.argv[2] || 8080;
const rootDir = process.argv[3] || './public';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const filePath = path.join(rootDir, parsedUrl.pathname);
  const stat = fs.statSync(filePath);

  if (stat.isFile()) {
    const mime = require('mime-types').lookup('type', filePath);
    res.writeHead(200, { 'Content-Type': mime || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else if (stat.isDirectory()) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readdir(filePath, (err, files) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }
      let indexFile = 'index.html';
      let fileFound = files.some(file => file === indexFile);
      if (!fileFound) {
        indexFile = files[0];
      }
      const indexFilePath = path.join(filePath, indexFile);
      fs.readFile(indexFilePath, (err, content) => {
        if (err) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      });
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Starting HTTP server...
- Port: ${port}
- Root: ${rootDir}
- URL: http://${hostname}:${port}
`);
});
