// Main program of the API tester
// This file contains the logic for making HTTP requests and parsing CLI arguments.
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Parse CLI arguments
const parseArgs = (args) => {
  const method = args[0];
  const url = args[1];
  let data = null;
  let headers = {};
  let requestFile = false;

  for (let i = 2; i < args.length; i++) {
    if (args[i] === '-d') {
      data = args[i + 1];
      i++;
    } else if (args[i] === '-h') {
      headers = JSON.parse(args[i + 1]);
      i++;
    } else if (args[i] === '--request-file') {
      requestFile = true;
      break;
    }
  }

  return {
    method,
    url,
    data,
    headers,
    requestFile
  };
};

// Read request file
const readRequestFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const requests = JSON.parse(content);
  return requests;
};

// Make HTTP request
const makeRequest = async (method, url, data, headers) => {
  const init = {
    method,
    headers
  };

  if (data) {
    if (method === 'GET') {
      throw new Error('Data cannot be sent with a GET request');
    }

    init.body = data;
  }

  try {
    const response = await fetch(url, init);
    const responseBody = await response.text();
    return {
      status: response.status,
      headers: response.headers.raw(),
      body: responseBody
    }
  } catch (error) {
    throw error;
  }
};

// Save response to file
const saveResponseToFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, 'utf-8');
};

// Main function
const main = async () => {
  try {
    const args = process.argv.slice(2);
    const { method, url, data, headers, requestFile } = parseArgs(args);

    if (requestFile) {
      const requests = readRequestFile(url);
      for (const request of requests) {
        const response = await makeRequest(request.method, request.url, request.data, request.headers);
        console.log(
          JSON.stringify(
            {
              url: response.url,
              status: response.status,
              headers: response.headers,
              body: response.body
            },
            null,
            2
          ),
          '
        );
      }
    } else {
      const response = await makeRequest(method, url, data, headers);
      console.log(
        JSON.stringify(
          {
            url: response.url,
            status: response.status,
            headers: response.headers,
            body: response.body
          },
          null,
          2
        ),
        '
      );
    }
  } catch (error) {
    console.error(error);
  }
}

main();