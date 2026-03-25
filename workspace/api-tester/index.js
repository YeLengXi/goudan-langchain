const https = require('https');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');
const { read_file, write_file, exec_command, list_directory } = require('./utils');

const CONFIG_FILE = path.join(__dirname, 'config.json');

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args._[0] === 'GET' || args._[0] === 'POST' || args._[0] === 'PUT' || args._[0] === 'DELETE' || args._[0] === 'PATCH') {
    const method = args._[0];
    const url = args._[1];
    const data = args.d || null;
    const headers = args.h || {};

    try {
      const response = await fetchRequest(method, url, data, headers);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  } else if (args._[0] === '--request-file') {
    const requestFile = args._[1];
    const requests = await read_file(requestFile);
    const parsedRequests = JSON.parse(requests);

    for (const request of parsedRequests) {
      try {
        const response = await fetchRequest(request.method, request.url, request.data, request.headers);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    console.log('Unknown command');
  }
}

async function fetchRequest(method, url, data, headers) {
  const options = {
    method,
    headers
  }

  if (data) {
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.body = JSON.stringify(data);
      options.headers['Content-Type'] = 'application/json';
    } else if (method === 'GET') {
      const urlWithQuery = new URL(url);
      urlWithQuery.searchParams.append('query', data);
      url = urlWithQuery.toString();
    }
  }

  const start = Date.now();
  const response = await fetch(url, options);
  const duration = Date.now() - start;

  const responseBody = await response.text();
  const parsedResponse = JSON.parse(responseBody);

  console.log(`Response Time: ${duration}ms`);
  console.log(`Status Code: ${response.status}`);
  console.log(`Headers: ${JSON.stringify(response.headers.raw())}`);
  console.log(parsedResponse);

  return parsedResponse;
}

main();