# API Tester

A CLI tool for testing REST APIs.

## Installation

To install api-tester, run:

    npm install -g api-tester

## Usage

### Basic Usage

To test an API, run:

    api-tester [HTTP method] [URL]

Example:

    api-tester GET https://api.example.com/users

### Advanced Usage

To use request body, run:

    api-tester [HTTP method] [URL] -d '{"key":"value"}'

To use request file, run:

    api-tester --request-file requests.json

## Configuration

You can configure api-tester in the package.json file.

## License

MIT