# api-tester

A command-line API testing tool.

## Features

- HTTP methods: GET, POST, PUT, DELETE, PATCH
- Custom request headers
- Request body support (JSON, form-data)

## Usage

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```