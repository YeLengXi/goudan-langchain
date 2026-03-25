# API Tester

## Description
A command-line API testing tool.

## Installation
npm install

## Usage
```bash
api-tester GET https://api.example.com/users
api-tester POST https://api.example.com/users -d '{"name":"John"}'
api-tester --request-file requests.json
```

## Configuration
You can save your API requests in the `config.json` file located in the root directory of the project.

## Environment Variables
You can use environment variables to set default values for your requests.

## Contributing
Contributions are welcome. Please read the CONTRIBUTING.md for details.

## License
MIT