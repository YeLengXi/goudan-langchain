#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const util = require('util');
const mime = require('mime');
const log = require('log4js').getLogger();

const serveStatic = require('serve-static');
const cors = require('cors');

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
      log.error(err);
      return;
    }

    if (stats.isDirectory()) {
      filePath += '/index.html';
      fs.stat(filePath, (err, stats) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found
');
          log.error(err);
          return;
        }

        res.writeHead(200, { 'Content-Type': mime.getType(filePath) || 'text/plain' });
        fs.createReadStream(filePath).pipe(res);
        log.info(`Served ${req.url}`);
      });
    } else {
      res.writeHead(200, { 'Content-Type': mime.getType(filePath) || 'text/plain' });
      fs.createReadStream(filePath).pipe(res);
      log.info(`Served ${req.url}`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Starting HTTP server...\n- Port: ${PORT}\n- Root: ${DIR}\n- URL: http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});