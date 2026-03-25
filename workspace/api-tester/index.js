const https = require('https');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');
const { green, red } = require('chalk');

const CONFIG_FILE = path.join(__dirname, 'config.json');

// Load configuration
const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));

// Function to make HTTP request
async function makeRequest(method, url, headers, body) {
  const options = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }

  try {
    const start = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    const data = await response.json();
    const responseTime = endTime - start;

    console.log(green(`Response Time: ${responseTime}ms`));
    console.log(green(`Status Code: ${response.status}`));
    console.log(green(`Headers: ${JSON.stringify(response.headers.raw())}`));
    console.log(green(`Body: ${JSON.stringify(data)}`));

    return data;
  } catch (error) {
    console.error(red(`Error: ${error.message}`));
  }
}

// CLI interface
async function main() {
  const args = parseArgs(process.argv.slice(2));

  let { method, url } = args;
  let headers = {};
  let body = {};

  if (args.d) {
    body = JSON.parse(args.d);
  }

  if (args.h) {
    headers = JSON.parse(args.h);
  }

  if (!method || !url) {
    console.error(red('Error: Missing method or URL'));
    return;
  }

  await makeRequest(method, url, headers, body);
}

main();