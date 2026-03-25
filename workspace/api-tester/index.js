const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const appendFileAsync = promisify(fs.appendFile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: api-tester <method> <url> [options]');
    process.exit(1);
  }

  const [method, url] = args.splice(0, 2);
  const options = args.reduce((acc, arg) => {
    if (arg.startsWith('-')) {
      acc.options.push(arg);
    } else if (arg.startsWith('-d')) {
      acc.data = arg.substring(2);
    } else {
      acc.url = arg;
    }
    return acc;
  }, {
    method: method,
    url: url,
    data: null,
    options: []
  });

  try {
    const response = await fetchRequest(options);
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  rl.close();
}

async function fetchRequest({ method, url, data, options }) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  if (data) {
    const body = JSON.stringify(data);
    headers.append('Content-Length', body.length);
  }

  const init = {
    method: method,
    headers: headers
  }

  if (data) {
    init.body = data;
  }

  try {
    const startTime = Date.now();
    const response = await fetch(url, init);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`Response Time: ${responseTime}ms`);
    console.log(`Status Code: ${response.status}`);
    console.log(`Headers: ${JSON.stringify(response.headers.raw())}`);

    if (response.ok) {
      const responseBody = await response.json();
      console.log('Response Body:', responseBody);
    } else {
      console.error('Error:', response.statusText);
    }

    return response;
  } catch (error) {
    throw error;
  }
}

main();