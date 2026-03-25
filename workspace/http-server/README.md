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

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `node server.js --port 8080 --dir ./public`

## Usage

Run the server with the following command:

```bash
node server.js --port 8080 --dir ./public
node server.js --port 3000 --dir ./dist
```

## Starting the Server

```bash
Starting HTTP server...
- Port: 8080
- Root: ./public
- URL: http://localhost:8080
Press Ctrl+C to stop
```