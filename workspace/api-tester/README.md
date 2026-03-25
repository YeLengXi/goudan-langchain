# api-tester

A CLI tool for testing REST APIs

## Installation

To install the tool, run:

```bash
npm install -g api-tester
```

## Usage

### Basic Usage

To test an API, you can use the following commands:

```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
```

### Advanced Usage

You can also use the --request-file option to load requests from a file:

```bash
api-tester --request-file requests.json
```

## Configuration

You can configure the tool by editing the package.json file.

## Contributing

Contributions are welcome!

## License

MIT