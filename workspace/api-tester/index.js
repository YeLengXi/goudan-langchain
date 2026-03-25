const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const executeRequest = async (method, url, headers, body, requestFile) => {
  let promise;
  if (method.toUpperCase() === 'GET') {
    promise = new Promise((resolve, reject) => {
      http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  } else if (method.toUpperCase() === 'POST') {
    promise = new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: headers
      };
      http.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      }).on('error', (err) => {
        reject(err);
      }).end(body);
    });
  }
  // Add other HTTP methods here

  try {
    const response = await promise;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

rl.on('line', async (input) => {
  const [method, url, ...args] = input.split(' '); 
  let headers = {};
  let body = null;
  args.forEach(arg => {
    if (arg.startsWith('-')) {
      if (arg === '-d') {
        body = args.pop();
      } else {
        headers[arg.substring(1)] = args.pop();
      }
    }
  });
  if (requestFile) {
    const content = await readFileAsync(requestFile, 'utf8');
    const { method, url, headers, body } = JSON.parse(content);
    await executeRequest(method, url, headers, body);
  } else {
    await executeRequest(method, url, headers, body);
  }

  rl.close();
});