# Simple HTTP Server

This is a simple HTTP server that serves static files from a specified directory.

## Features

- Serve static files
- Directory browsing
- MIME type detection
- CORS support
- Request logging
- Error handling (404, 500)
- Graceful shutdown

## Usage

Start the server with the following command:

```bash
node server.js --port 8080 --dir ./public
```

Replace `8080` with the desired port number and `./public` with the directory containing the static files.

## CLI Options

- `--port` - Specify the port number (default: 8080)
- `--dir` - Specify the directory to serve static files from
