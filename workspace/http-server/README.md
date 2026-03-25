# Simple HTTP Server

This is a simple HTTP server that serves static files from a specified directory.

## Features

- Serves files from a specified directory.
- Supports directory listing.
- Automatically detects MIME types.
- Supports CORS.
- Logs requests.
- Handles errors (404, 500, etc.).
- Graceful shutdown.

## Usage

```bash
node server.js --port 8080 --dir ./public
node server.js --port 3000 --dir ./dist
```