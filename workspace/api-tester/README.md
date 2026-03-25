# API Tester

A command-line tool for testing REST APIs.

## Installation

To install the tool, run:

```bash
npm install -g api-tester
```

## Usage

To use the tool, run the following commands:

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```

## Options

- `GET`, `POST`, `PUT`, `DELETE`, `PATCH`: Specify the HTTP method.
- `-d`, `--data`: Specify the request data in JSON format.
- `--request-file`: Specify a file containing a request.

## Examples

```json
{
  "method": "GET",
  "url": "https://api.example.com/users"
}
```