# Simple HTTP Server

This is a simple HTTP server that serves static files from a specified directory.

## Features

- Serves static files from a specified directory.
- Supports directory browsing.
- Auto-detects MIME types.
- Supports CORS.
- Logs requests.
- Handles errors (404, 500, etc.).
- Graceful shutdown.

## Usage

To start the server, run:

    node server.js --port 8080 --dir ./public

or

    node server.js --port 3000 --dir ./dist

Replace `8080` and `./public` with your desired port and directory.

## Dependencies

None

## License

MIT
