# API Tester

A CLI tool for testing REST APIs.

## Features

- HTTP methods: GET, POST, PUT, DELETE, PATCH
- Custom request headers
- Request body support (JSON, form-data)
- Configuration management
- Environment variable support
- Request collection management
- Response handling
- Beautiful JSON output
- Display response time
- Display status code and headers
- Save response to file

## Usage

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```