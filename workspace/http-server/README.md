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

Start the server with the following command:

```bash
node server.js --port 8080 --dir ./public
node server.js --port 3000 --dir ./dist
```

## Starting the Server

To start the server, run the following command in the terminal:

```bash
node server.js --port 8080 --dir ./public
```

This will start the server on port 8080 and serve files from the './public' directory.

## Stopping the Server

To stop the server, press Ctrl+C in the terminal.
