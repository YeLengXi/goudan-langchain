# api-tester

A command-line API testing tool.

## Installation

To use this tool, you need to have Node.js installed.

```bash
npm install -g api-tester
```

## Usage

```bash
api-tester <method> <url> [options]
```

### Examples

- Test a GET request:
  ```bash
api-tester GET https://api.example.com/users
  ```

- Test a POST request with JSON body:
  ```bash
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
  ```

- Load requests from a file:
  ```bash
api-tester --request-file requests.json
  ```

## Options

- `-d, --data` - Set the request body. Can be JSON or form-data.
- `--request-file` - Load requests from a file.
