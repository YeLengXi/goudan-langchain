// This is the main program of the API tester.
// It provides the functionality to send HTTP requests and handle the responses.
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Parse command-line arguments
const parseArgs = require('minimist');

// Read configuration file
const readConfig = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading configuration file:', error);
    return {};
  }
};

// Write response to file
const writeResponseToFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, 'utf8');
};

// Format JSON response
const formatResponse = (response) => {
  return JSON.stringify(response, null, 2);
};

// Send HTTP request
const sendHttpRequest = async (method, url, headers, body) => {
  try {
    const options = {
      method,
      headers,
    }

    if (body) {
      if (headers['Content-Type'] === 'application/json') {
        options.body = JSON.stringify(body);
      } else if (headers['Content-Type'] === 'multipart/form-data') {
        // TODO: Implement form-data handling
      }
    }

    const startTime = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return {
      status: response.status,
      headers: response.headers.raw(),
      body: await response.text(),
      responseTime
    ];
  } catch (error) {
    console.error('Error sending HTTP request:', error);
    return {
      error: error.message
    ];
  }
};

// Main function
const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  const config = readConfig(path.join(__dirname, 'config.json'));

  if (args._[0]) {
    const method = args._[0].toUpperCase();
    const url = args._[1];
    const headers = args.headers || {};
    const body = args.body ? JSON.parse(args.body) : null;

    const response = await sendHttpRequest(method, url, headers, body);
    console.log(formatResponse(response));
  }

  if (args.requestFile) {
    const requestFilePath = path.join(__dirname, args.requestFile);
    const requests = readConfig(requestFilePath);
    for (const request of requests) {
      const response = await sendHttpRequest(request.method, request.url, request.headers, request.body);
      console.log(formatResponse(response));
    }
  }

  if (args.config) {
    console.log(JSON.stringify(config, null, 2));
  }
};

// Run the main function
main();