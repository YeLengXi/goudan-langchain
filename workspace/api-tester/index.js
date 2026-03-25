const https = require('https');
const { parseArgs } = require('minimist');
const fs = require('fs');
const path = require('path');

const API_TESTER_PATH = path.join(__dirname, 'examples', 'requests.json');

function fetchApi(url, method, headers, body) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers
    };
    if (body) {
      options.body = body;
    }
    https.get(url, response => {
      const chunks = [];
      response.on('data', chunk => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        const data = Buffer.concat(chunks).toString();
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          data
        });
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

function parseArgs(args) {
  const { _, ...options } = args;
  return options;
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.url) {
    console.error('Error: URL is required');
    process.exit(1);
  }

  fetchApi(args.url, args.method, args.headers, args.body).then(response => {
    console.log('Status Code:', response.statusCode);
    console.log('Headers:', response.headers);
    console.log('Body:', response.data);
  }).catch(error => {
    console.error('Error:', error);
  });
}

if (require.main === module) {
  main();
}