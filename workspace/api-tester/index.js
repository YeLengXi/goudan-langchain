const https = require('https');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');
const { readFileSync } = require('fs');
const { yellow, blue } = require('chalk');

const CONFIG_FILE = path.join(__dirname, 'config.json');

// Load configuration
let config = {};
try {
  config = JSON.parse(readFileSync(CONFIG_FILE, 'utf8'));
} catch (error) {
  console.error(yellow('Configuration file not found. Creating a new one.'));
  fs.writeFileSync(CONFIG_FILE, JSON.stringify({}, null, 2), 'utf8');
}

// Parse command line arguments
const args = parseArgs(process.argv.slice(2));

// Execute command
async function executeCommand() {
  try {
    const { method, url, data, requestFile } = args;

    if (requestFile) {
      const requests = JSON.parse(readFileSync(requestFile, 'utf8'));
      for (const request of requests) {
        await sendRequest(request.method, request.url, request.data);
      }
    } else {
      await sendRequest(method, url, data);
    }
  } catch (error) {
    console.error(blue(error.message));
  }
}

// Send HTTP request
async function sendRequest(method, url, data) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers['Content-Type'] = 'application/json';
  }

  const options = {
    method: method,
    headers: headers
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const start = Date.now();
    const response = await fetch(url, options);
    const duration = Date.now() - start;
    const responseBody = await response.text();

    console.log(yellow(`Response Time: ${duration}ms`));
    console.log(blue(`Status Code: ${response.status}`));
    console.log(blue(`Headers: ${JSON.stringify(response.headers.raw())}`));
    console.log(yellow(`Response Body: ${responseBody}`));

    return responseBody;
  } catch (error) {
    throw new Error(error.message);
  }
}

executeCommand();