# api-tester

A command-line API testing tool.

## Installation

To install api-tester, run:

```bash
npm install -g api-tester
```

## Usage

To test an API, run:

```bash
api-tester GET https://api.example.com/users
```

To send a POST request with JSON body, run:

```bash
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
```

To use a request file, run:

```bash
api-tester --request-file requests.json
```

## Configuration

You can configure api-tester by editing the package.json file.

## Contributing

Contributions are welcome!

Please see the CONTRIBUTING.md for details.

## License

MIT