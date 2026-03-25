const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const DEFAULT_REQUEST_FILE = 'examples/requests.json';

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

    https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: JSON.parse(data)
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function parseRequestFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data.toString()));
      }
    });
  });
}

function run() {
  const args = parse(process.argv.slice(2));

  if (args._[0] === 'GET') {
    makeRequest('GET', args.url, {}, {}).then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
  }

  if (args._[0] === 'POST') {
    makeRequest('POST', args.url, {}, args.body).then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
  }

  // Add more methods as needed
}

run();