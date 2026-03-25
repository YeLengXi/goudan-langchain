# Simple HTTP Server

This is a simple HTTP server that serves static files from a specified directory.

## Features

- Specify port and root directory
- Support directory indexing
- MIME type auto-detection
- CORS support
- Request logging
- Error handling (404, 500, etc.)
- Graceful shutdown

## Usage

```bash
node server.js --port 8080 --dir ./public
node server.js --port 3000 --dir ./dist
```