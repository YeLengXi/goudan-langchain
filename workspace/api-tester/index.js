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
  const method = args[0];
  const url = args[1];

  if (!method || !url) {
    console.error('Usage: api-tester <method> <url>');
    process.exit(1);
  }

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    const data = args[args.indexOf('-d') + 1];
    options.body = JSON.stringify(data);
  }

  try {
    const start = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    const duration = endTime - start;

    console.log(`Status Code: ${response.status}
Headers: ${JSON.stringify(response.headers.raw())}
Duration: ${duration}ms
Response Body: ${await response.text()}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();