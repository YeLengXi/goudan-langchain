# API Tester

This tool allows you to test REST APIs from the command line.

## Installation

To install the tool, run the following command:

```bash
npm install -g api-tester
```

## Usage

To use the tool, run the following commands:

- To perform a GET request:
  ```bash
api-tester GET https://api.example.com/users
```

- To perform a POST request:
  ```bash
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
```

- To use a request file:
  ```bash
api-tester --request-file requests.json
```