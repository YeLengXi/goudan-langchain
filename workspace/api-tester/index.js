const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const executeRequest = async (method, url, headers, body) => {
  const options = {
    method,
    headers
  }

  if (body) {
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }
  }

  try {
    const start = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    const time = endTime - start;

    const data = await response.json();
    console.log(`Status Code: ${response.status}
Response Time: ${time}ms
Headers: ${JSON.stringify(response.headers.raw())}
Data: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

rl.on('line', async (input) => {
  const [method, url, ...args] = input.split(' ');
  let headers = {};
  let body = null;

  args.forEach(arg => {
    if (arg.startsWith('-')) {
      if (arg === '-d') {
        body = JSON.parse(args.pop());
      } else {
        headers[arg.substring(2)] = args.pop();
      }
    }
  });

  await executeRequest(method, url, headers, body);
}).on('close', () => {
  rl.close();
});