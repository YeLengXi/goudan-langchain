# api-tester

A command-line API testing tool.

## Usage

To perform a GET request:

    api-tester GET https://api.example.com/users

To perform a POST request:

    api-tester POST https://api.example.com/users -d '{\"name\":\"John\"}'

To perform a PUT request:

    api-tester PUT https://api.example.com/users -d '{\"name\":\"John\"}'

To perform a DELETE request:

    api-tester DELETE https://api.example.com/users

To perform a PATCH request:

    api-tester PATCH https://api.example.com/users -d '{\"name\":\"John\"}'

To load requests from a file:

    api-tester --request-file requests.json
