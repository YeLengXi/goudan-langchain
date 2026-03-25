const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const DEFAULT_CONFIG_PATH = './config.json';

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

module.exports = {
  fetchApi
};