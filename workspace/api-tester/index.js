const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const DEFAULT_REQUEST_FILE = 'examples/requests.json';

function fetchApi(url, method, headers, body) {
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
          body: JSON.parse(data)
        });
      });
    }).on('error', error => {
      reject(error);
    });
  });
}

function parseRequestFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function main() {
  const args = parse(process.argv.slice(2));
  let { url, method, body, requestFile } = args;

  if (requestFile) {
    const requests = parseRequestFile(requestFile);
    requests.forEach(request => {
      fetchApi(request.url, request.method, request.headers, request.body).then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      });
    });
  } else {
    fetchApi(url, method, {}, body).then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
  }
}

main();