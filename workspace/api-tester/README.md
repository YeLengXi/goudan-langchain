# api-tester

A command-line API testing tool.

## Installation

To install the tool, run:

```bash
npm install -g api-tester
```

## Usage

To test an API, run:

```bash
api-tester GET https://api.example.com/users
```

To send a POST request with JSON data:

```bash
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
```

To load requests from a file:

```bash
api-tester --request-file requests.json
```