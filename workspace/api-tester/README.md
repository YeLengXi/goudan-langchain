# api-tester

A command-line API testing tool.

## Installation

To install api-tester, run:

    npm install -g api-tester

## Usage

To test an API, run:

    api-tester [method] [url]

Options:

  -d, --data [data]  Set request body
  -H, --header [header]  Set request header
  -f, --file [file]  Read requests from a file

## Examples

To send a GET request to https://api.example.com/users:

    api-tester GET https://api.example.com/users

To send a POST request to https://api.example.com/users with JSON body:

    api-tester POST https://api.example.com/users -d '{"name":"John"}'

To read requests from a file:

    api-tester --request-file requests.json