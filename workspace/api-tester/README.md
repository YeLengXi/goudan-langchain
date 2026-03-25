# api-tester

A command-line API testing tool.

## Installation

To install api-tester, run:

```bash
npm install -g api-tester
```

## Usage

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```

## Options

- `GET`, `POST`, `PUT`, `DELETE`, `PATCH` - The HTTP method to use.
- `-d, --data` - The request data in JSON format.
- `-H, --header` - Set a custom header.
- `--request-file` - Load requests from a file.

## Examples

Save the following requests in a file named `requests.json`:

```json
[
  {
    "method": "GET",
    "url": "https://api.example.com/users"
  },
  {
    "method": "POST",
    "url": "https://api.example.com/users",
    "data": {
      "name": "John"
    }
  }
]
```