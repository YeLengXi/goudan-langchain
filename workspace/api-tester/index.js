const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const fetch = async (method, url, options = {}) => {
  const { headers, body } = options;
  const promise = new Promise((resolve, reject) => {
    const req = https.request(url, {
      method,
      ...headers
    }, res => {
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: Buffer.concat(data).toString(),
          time: Date.now() - start
        });
      });
    });

    req.on('error', e => {
      reject(e);
    });

    if (body) {
      req.write(body);
    }
    req.end();
  });

  const start = Date.now();
  try {
    const response = await promise;
    response.time = response.time + "ms";
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = fetch;