# API-Tester

## Overview
API-Tester is a command-line tool for testing REST APIs.

## Features
- HTTP method support (GET, POST, PUT, DELETE, PATCH)
- Custom request headers
- Request body support (JSON, form-data)
- Configuration management (save, load API requests)
- Environment variable support
- Request set management
- Beautiful JSON output
- Response time display
- Status code and header information display
- Save response to file

## Usage
```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```