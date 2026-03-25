const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const packageJson = require('./package.json');

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

function performRequest(method, url, headers, data) {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: headers
    }

    if (data) {
      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        options.headers['Content-Type'] = 'application/json';
        data = JSON.stringify(data);
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

function parseArgs(args) {
  let method = args[0];
  let url = args[1];
  let data = null;
  let headers = {};

  args.forEach(arg => {
    if (arg.startsWith('-')) {
      if (arg === '-d') {
        data = JSON.parse(args[args.indexOf(arg) + 1]);
      } else if (arg.startsWith('--')) {
        const [key, value] = arg.split('=');
        headers[key.slice(2)] = value;
      }
    }
  });

  return { method, url, data, headers };
}

function main() {
  rl.question('Enter API endpoint: ', async (url) => {
    rl.question('Enter HTTP method (GET, POST, PUT, DELETE, PATCH): ', async (method) => {
      rl.question('Enter headers (optional): ', async (headersInput) => {
        if (headersInput) {
          headers = JSON.parse(headersInput);
        }

        rl.question('Enter data (optional): ', async (dataInput) => {
          if (dataInput) {
            data = JSON.parse(dataInput);
          }

          const { method, url, data, headers } = parseArgs([method, url]);

          try {
            const response = await performRequest(method, url, headers, data);
            console.log(`Status Code: ${response.statusCode}`);
            console.log('Headers:', response.headers);
            console.log('Body:', response.body);
          } catch (error) {
            console.error('Error:', error);
          }
        }
      });
    });
  });
}

main();