const https = require('https');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const headers = {
  'Content-Type': 'application/json
};

async function makeRequest(method, url, data = null) {
  const options = {
    method,
    headers
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const start = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    const time = endTime - start;

    const responseBody = await response.text();
    const parsedResponse = JSON.parse(responseBody);

    console.log(`Status Code: ${response.status}
Response Time: ${time}ms
Headers: ${JSON.stringify(response.headers.raw())}
Response Body: ${JSON.stringify(parsedResponse)}`);

    return parsedResponse;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  makeRequest
};