const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
      const [key, value] = arg.split('=');
      acc[key.slice(1)] = value;
    }
    return acc;
  }, {});

  try {
    const response = await fetchRequest(method, url, options);
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error(error);
  }
}

async function fetchRequest(method, url, options) {
  const { headers, body } = options;
  const isJson = headers && headers['content-type'] === 'application/json';
  const data = isJson ? JSON.stringify(body) : body;

  const requestOptions = {
    method,
    headers: {
      'Content-Type': isJson ? 'application/json' : 'application/x-www-form-urlencoded',
      ...headers
    },
    body: data
  };

  try {
    const start = Date.now();
    const response = await https.get(url, requestOptions);
    const endTime = Date.now();
    console.log(`Response time: ${endTime - start}ms`);
    return response;
  } catch (error) {
    throw error;
  }
}

main();