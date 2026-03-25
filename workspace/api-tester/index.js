const https = require('https');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');
const { readFileSync } = require('fs');
const { yellow, blue, green, red } = require('chalk');

const configFilePath = path.join(__dirname, 'config.json');

// Load configuration
let config = {};
try {
  config = JSON.parse(readFileSync(configFilePath, 'utf8'));
} catch (error) {
  console.error(red(`Error reading configuration file: ${error.message}`));
}

// Parse command line arguments
const args = parseArgs(process.argv.slice(2));

// Define HTTP methods
const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

// Function to perform HTTP request
async function performHttpRequest(method, url, headers = {}, body = null) {
  const options = {
    method,
    headers
  }

  if (body) {
    if (headers['Content-Type'] === 'application/json') {
      body = JSON.stringify(body);
    }
    options.body = body;
  }

  try {
    const startTime = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(green(`Status Code: ${response.status}`));
    console.log(blue(`Response Time: ${responseTime}ms`));
    console.log(yellow(`Headers:`));
    console.log(JSON.stringify(response.headers.raw(), null, 2));

    const data = await response.json();
    console.log(green(`Data:`));
    console.log(JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.error(red(`Error: ${error.message}`));
  }
}

// CLI interface
async function cliInterface() {
  if (args._.length === 0) {
    console.log(red('No command specified.'));
    return;
  }

  const method = args._[0].toUpperCase();
  const url = args._[1];

  if (!httpMethods.includes(method)) {
    console.log(red(`Invalid HTTP method: ${method}`));
    return;
  }

  let body = null;
  if (args.d) {
    body = JSON.parse(args.d);
  }

  if (args.f) {
    body = JSON.parse(readFileSync(args.f, 'utf8'));
  }

  await performHttpRequest(method, url, {}, body);
}

cliInterface();