# api-tester

A command-line API testing tool.

## Installation

To use api-tester, first install it globally using npm:

```bash
npm install -g api-tester
```

## Usage

To test an API, use the following format:

```bash
api-tester <method> <url> [options]
```

### Options

- `-d`, `--data`: Set the request body. The data can be in JSON format.
- `-H`, `--header`: Set a custom header. The header can be in JSON format.
- `--request-file`: Specify a file containing a list of requests to be executed.

### Examples

Test a GET request:

```bash
api-tester GET https://api.example.com/users
```

Test a POST request with JSON body:

```bash
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
```

Execute requests from a file:

```bash
api-tester --request-file requests.json
```
