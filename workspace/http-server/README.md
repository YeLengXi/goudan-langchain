# Simple HTTP Server

This is a simple HTTP server that serves static files from a specified directory.

## Features

- Serves static files from a specified directory.
- Supports directory listing.
- Auto-detects MIME types.
- CORS support.
- Request logging.
- Error handling (404, 500, etc.).
- Graceful shutdown.

## Installation

Make sure you have Node.js installed.

## Usage

To start the server, run:

```bash
node server.js --port 8080 --dir ./public
```

Replace `8080` with the desired port and `./public` with the directory you want to serve.

## Contributing

Feel free to contribute to this project!

## License

MIT