# API Tester

This tool is a command-line API testing tool that allows you to easily test REST APIs.

## Features

- HTTP methods: GET, POST, PUT, DELETE, PATCH
- Custom request headers
- Request body support (JSON, form-data)
- Response formatting
- Command-line interface

## Usage

To use the tool, you need to have Node.js installed.

### Install the tool

To install the tool, run the following command:

```bash
npm install -g api-tester
```

### Run a GET request

To run a GET request, use the following command:

```bash
api-tester GET https://api.example.com/users
```

### Run a POST request

To run a POST request, use the following command:

```bash
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
```

### Load requests from a file

To load requests from a file, use the following command:

```bash
api-tester --request-file requests.json
```

## Contributing

Contributions are welcome. Please follow the contributing guidelines.
