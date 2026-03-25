# API Tester

This tool helps developers quickly test REST APIs.

## Installation

To use this tool, you need to install it globally using npm:

```bash
npm install -g api-tester
```

## Usage

To send a GET request:

```bash
api-tester GET https://api.example.com/users
```

To send a POST request with JSON body:

```bash
api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'
```

To load requests from a file:

```bash
api-tester --request-file requests.json
```

## Configuration

You can configure the tool by editing the config.json file in the root directory.

## Contributing

Contributions are welcome. Please see the CONTRIBUTING.md file for details.

## License

MIT