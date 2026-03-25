const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const DEFAULT_REQUEST_FILE = path.join(__dirname, '../examples/requests.json');

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
  const requests = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return requests.map(request => {
    return {
      url: request.url,
      method: request.method,
      headers: request.headers || {},
      body: request.body || null
    };n  });
}

module.exports = {
  fetchApi,
  parseRequestFile
}