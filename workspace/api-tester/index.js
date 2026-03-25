const https = require('https');
const { parse } = require('minimist');
const fs = require('fs');
const path = require('path');

const DEFAULT_REQUEST_FILE = 'requests.json';

function makeRequest(method, url, headers, body) {
  return new Promise((resolve, reject) => {
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

    https.get(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          body: data
        });
      });
    }).on('error', error => {
      reject(error);
    });
  });
}

function parseArguments(args) {
  const parsedArgs = parse(args);
  const { method, url, _ } = parsedArgs;
  let headers = parsedArgs.headers || {};
  let body = parsedArgs.body || {};

  if (_.length > 0) {
    _.forEach(arg => {
      if (arg.startsWith('-h') || arg.startsWith('--header')) {
        const header = arg.split('=')[1];
        headers[header.split(':')[0]] = header.split(':')[1];
      }
      if (arg.startsWith('-d') || arg.startsWith('--data')) {
        body = JSON.parse(arg.split('=')[1]);
      }
    });
  }

  return { method, url, headers, body };}

function run() {
  const args = process.argv.slice(2);
  const { method, url, headers, body } = parseArguments(args);

  makeRequest(method, url, headers, body)
    .then(response => {
      console.log(`Status Code: ${response.statusCode}`);
      console.log(`Headers: ${JSON.stringify(response.headers)}`);
      console.log(`Body: ${JSON.stringify(response.body)}`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

run();