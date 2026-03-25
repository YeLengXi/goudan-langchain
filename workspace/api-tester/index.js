// Main program of the API testing tool.
// This program handles the CLI arguments, performs HTTP requests, and formats the responses.

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const parseArgs = (args) => {
  let method = 'GET';
  let url = '';
  let data = null;
  let headers = {};

  args.forEach(arg => {
    if (arg.startsWith('--')) {
      if (arg === '--request-file') {
        url = fs.readFileSync(arg.slice(11), 'utf-8').trim();
      } else {
        console.error(`Unknown option: ${arg}`);
        process.exit(1);
      }
    } else if (arg.startsWith('-')) {
      switch (arg)
      {
        case '-d':
          data = JSON.parse(arg.slice(2));
          break;
        case '-h':
          headers = JSON.parse(arg.slice(2));
          break;
        default:
          console.error(`Unknown option: ${arg}`);
          process.exit(1);
      }
    } else {
      method = arg;
    }
  });

  return { method, url, data, headers };
};

// Perform HTTP request
const performRequest = async (method, url, data, headers) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    });

    const responseTime = Date.now() - startTime;
    const responseJson = await response.json();

    return {
      statusCode: response.status,
      headers: response.headers.raw(),
      body: responseJson,
      responseTime
    ];
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Format response
const formatResponse = (response) => {
  console.log(`Status Code: ${response.statusCode}
Headers: ${JSON.stringify(response.headers)}
Response Time: ${response.responseTime}ms
Body:
${JSON.stringify(response.body, null, 2)}`);

  if (response.statusCode === 200) {
    fs.writeFileSync('response.json', JSON.stringify(response.body, null, 2), 'utf-8');
  }
};

// Main
const args = process.argv.slice(2);
const { method, url, data, headers } = parseArgs(args);
const startTime = Date.now();
performRequest(method, url, data, headers).then(response => {
  formatResponse(response);
  console.log(`Request completed in ${response.responseTime}ms`);
}).catch(error => {
  console.error('Error:', error);
});