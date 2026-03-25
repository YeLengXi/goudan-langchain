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
      const data = [];
      response.on('data', chunk => data.push(chunk));
      response.on('end', () => {
        const resBody = Buffer.concat(data).toString();
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          body: resBody
        });
      });
    }).on('error', error => reject(error));
  });
}

function parseRequestFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

module.exports = {
  fetchApi,
  parseRequestFile
}