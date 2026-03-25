# api-tester

A command-line API testing tool.

## Installation

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

- `GET`, `POST`, `PUT`, `DELETE`, `PATCH`:	HTTP methods
- `-d`, `--data`:	Request body (in JSON format)
- `--request-file`:	Path to a file containing a list of requests

## Examples

### Request Example

```json
{
  "url": "https://api.example.com/users",
  "method": "GET",
  "headers": {},
  "body": {}
}
```