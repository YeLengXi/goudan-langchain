# API Tester

This tool is a command-line API testing tool that allows developers to quickly test REST APIs.

## Features

- HTTP method support: GET, POST, PUT, DELETE, PATCH
- Custom request headers
- Request body support (JSON, form-data)

## Usage

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{"name":"John"}'
api-tester --request-file requests.json
```

## Configuration

The tool saves frequently used API requests and supports environment variables and request set management.

## Response Handling

- Beautiful JSON output
- Display response time
- Display status code and headers
- Save response to file