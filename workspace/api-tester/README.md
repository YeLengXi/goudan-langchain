# api-tester

A command-line API testing tool.

## Installation

npm install

## Usage

```
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```

## Features

- HTTP methods: GET, POST, PUT, DELETE, PATCH
- Custom request headers
- Request body support (JSON, form-data)
- Configuration management
- Response handling
- CLI interface
