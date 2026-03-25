// This is the main program of the API tester.
// It handles the command-line arguments, makes HTTP requests, and formats the responses.

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const apiTester = async (args) => {
  const { method, url, data, requestFile } = parseArgs(args);

  if (requestFile) {
    const requests = JSON.parse(fs.readFileSync(requestFile, 'utf8'));
    for (const request of requests) {
      await makeRequest(method, request.url, request.data);
    }
  } else {
    await makeRequest(method, url, data);
  }
}

const makeRequest = async (method, url, data) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    method,
    headers,
    body: method === 'POST' || method === 'PUT' || method === 'PATCH' ? JSON.stringify(data) : null
  });

  const responseTime = Date.now() - startTime;
  const responseJson = await response.json();

  console.log(`Response Time: ${responseTime}ms`);
  console.log(`Status Code: ${response.status}`);
  console.log('Headers:', response.headers.raw());
  console.log('Body:', responseJson);

  fs.writeFileSync(
    path.join(__dirname, 'responses', `${Date.now()}.json`),
    JSON.stringify(responseJson, null, 2)
  );
}

module.exports = apiTester;
