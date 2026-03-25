# API Tester

This is a command-line tool for testing REST APIs.

## Installation

To install the API Tester, run the following command:

```bash
npm install -g api-tester
```

## Usage

To use the API Tester, run the following commands:

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
api-tester --request-file requests.json
```