const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const packageJson = require('./package.json');

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: api-tester <method> <url> [options]');
    process.exit(1);
  }

  const [method, url] = args[0].split(' ');
  const options = args.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    acc[key] = value;
    return acc;
  }, {});

  try {
    const response = await fetchRequest(method, url, options);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function fetchRequest(method, url, options) {
  const { headers, body } = options;
  const headersObj = headers ? JSON.parse(headers) : {};
  const bodyObj = body ? JSON.parse(body) : {};

  const fetchOptions = {
    method,
    headers: headersObj
  }

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    fetchOptions.body = JSON.stringify(bodyObj);
  }

  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    https.get(url, response => {
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        const endTime = Date.now();
        const data = Buffer.concat(chunks).toString();
        const parsedData = JSON.parse(data);
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          body: parsedData,
          responseTime: endTime - startTime
        });
      });
    }).on('error', error => {
      reject(error);
    });
  });
}

main();