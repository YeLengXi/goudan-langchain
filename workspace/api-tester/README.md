# api-tester

A CLI tool for testing REST APIs

## Installation

To use api-tester, first install it globally:

```bash
npm install -g api-tester
```

## Usage

To test a GET request:

```bash
api-tester GET https://api.example.com/users
```

To test a POST request with JSON body:

```bash
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
```

To use a request file:

```bash
api-tester --request-file requests.json
```

## Configuration

You can configure api-tester by editing the package.json file in the project directory.

## Contributing

Contributions are welcome!

Please read the CONTRIBUTING.md for details.

## License

MIT