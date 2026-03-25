const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const API_TESTER_PATH = path.join(__dirname, 'examples', 'requests.json');

function fetchApi(method, url, headers, body) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers
    }

    if (body) {
      options.body = body;
    }

    https.get(url, response => {
      const { statusCode } = response;
      const headers = response.headers;
      const chunks = [];

      response.on('data', chunk => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve({ statusCode, headers, body });
      });
    }).on('error', error => {
      reject(error);
    });
  });
}

function parseRequestFile(filePath) {
  const requests = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return requests;
}

module.exports = {
  fetchApi,
  parseRequestFile
}