# Simple HTTP Server

This is a simple HTTP server that serves static files from a specified directory.

## Features

- Serves static files from a specified directory.
- Supports directory listing.
- Automatically detects MIME types.
- Adds CORS support.
- Logs requests.
- Handles errors (404, 500, etc.).
- Graceful shutdown.

## Installation

No installation required. Just run the server.js file.

## Usage

```bash
node server.js --port 8080 --dir ./public
node server.js --port 3000 --dir ./dist
```

## Starting the Server

Run the following command to start the server:

```bash
node server.js --port 8080 --dir ./public
```

This will start the server on port 8080 and serve files from the './public' directory.

##Stopping the Server

Press Ctrl+C to stop the server.
