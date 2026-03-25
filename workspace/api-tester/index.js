const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const API_TESTER_DIR = path.join(__dirname, '../');
const CONFIG_FILE = path.join(API_TESTER_DIR, 'config.json');

function readConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return {};
  }
  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  return JSON.parse(content);
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

function sendRequest(method, url, headers, body) {
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
      const { statusCode, headers } = response;
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve({
          statusCode,
          headers,
          body
        });
      });
    }).on('error', error => reject(error));
  });
}

module.exports = {
  readConfig,
  saveConfig,
  sendRequest
}