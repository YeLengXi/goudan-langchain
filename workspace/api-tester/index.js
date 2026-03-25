const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const API_TESTER_PATH = path.join(__dirname, '../examples/requests.json');

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const contentType = ['application/json', 'multipart/form-data'];

async function fetchApi(url, method, headers, body) {
  const options = {
    method,
    headers
  }

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }

  try {
    const start = Date.now();
    const response = await https.get(url, options);
    const endTime = Date.now();
    const data = await response.json();
    console.log(`Response Time: ${endTime - start}ms`);
    console.log(`Status Code: ${response.statusCode}`);
    console.log('Headers:', response.headers);
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function parseArgs(args) {
  const parsedArgs = parse(args);
  const { method, url, _ } = parsedArgs;
  const headers = parsedArgs.headers || {};
  let body = parsedArgs.body;

  if (body) {
    try {
      body = JSON.parse(body);
    } catch (error) {
      console.error('Invalid JSON:', error);
      process.exit(1);
    }
  }

  return { method, url, headers, body }; 
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const { method, url, headers, body } = parseArgs(args);
  fetchApi(url, method, headers, body);
}
