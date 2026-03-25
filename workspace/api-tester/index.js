const https = require('https');
const { parse } = require('querystring');
const fs = require('fs');
const path = require('path');

const API_TESTER_PATH = path.join(__dirname, '../examples/requests.json');

function request(method, url, headers, body, requestFile) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers
    };

    if (body) {
      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        options.headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
      }
      options.body = body;
    }

    const startTime = Date.now();

    https.get(url, response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        try {
          const parsedData = JSON.parse(data);
          resolve({
            status: response.statusCode,
            headers: response.headers,
            data: parsedData,
            responseTime
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', error => {
      reject(error);
    });
  });
}

module.exports = {
  request,
  API_TESTER_PATH
}