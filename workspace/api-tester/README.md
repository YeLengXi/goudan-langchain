# api-tester

A CLI tool for testing REST APIs

## Installation

To use this tool, you need to install it globally:

```bash
npm install -g api-tester
```

## Usage

To test an API, you can use the following commands:

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```

## Options

- `GET`, `POST`, `PUT`, `DELETE`, `PATCH`: Specify the HTTP method.
- `-d`, `--data`: Provide the request body in JSON format.
- `--request-file`: Specify a file containing a request to be executed.

## Examples

```json
{
  "method": "GET",
  "url": "https://api.example.com/users"
}
```