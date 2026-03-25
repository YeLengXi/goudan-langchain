# API Tester

This is a simple command-line tool for testing REST APIs.

## Usage

To use the tool, run the following command:

```bash
api-tester <method> <url> [options]
```

### Methods

- GET
- POST
- PUT
- DELETE
- PATCH

### Options

- `-d`, `--data`   Send data in the request body
- `--request-file` Read requests from a file

## Examples

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```
