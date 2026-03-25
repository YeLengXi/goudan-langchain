# Simple HTTP Server

This is a simple HTTP server that serves static files from a specified directory.

## Features

- Specify port and root directory
- Support directory indexing
- Automatic MIME type detection
- CORS support
- Request logging
- Error handling (404, 500, etc.)
- Graceful shutdown

## Usage

Start the server with the following command:

```bash
node server.js --port 8080 --dir ./public
```

Replace `8080` with the desired port number and `./public` with the path to the directory containing the files to be served.

## Dependencies

No external dependencies are required.

## License

MIT
