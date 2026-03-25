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
  const isJson = body && typeof body === 'object';
  const isFormData = body && typeof body === 'string' && body.startsWith('form-data');

  const headersObj = {
    'Content-Type': isJson ? 'application/json' : isFormData ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
    ...headers
  };

  const requestOptions = {
    method,
    headers: headersObj
  }

  if (isJson) {
    requestOptions.body = JSON.stringify(body);
  } else if (isFormData) {
    requestOptions.body = body;
  }

  return new Promise((resolve, reject) => {
    const req = https.request(url, requestOptions, (res) => {
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(data).toString()
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(requestOptions.body);
    req.end();
  });
}

main();