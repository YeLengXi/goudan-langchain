// Main program of the API tester.
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');
const { read_file, write_file, exec_command, list_directory } = require('./utils');

const API_TESTER_PATH = path.join(__dirname, 'examples');

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args._[0] === 'GET' || args._[0] === 'POST' || args._[0] === 'PUT' || args._[0] === 'DELETE' || args._[0] === 'PATCH') {
    const method = args._[0];
    const url = args._[1];
    const headers = args.headers || {};
    const body = args.body ? JSON.parse(args.body) : null;

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: method === 'POST' || method === 'PUT' || method === 'PATCH' ? JSON.stringify(body) : null
      });

      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
      console.log(`Response time: ${Date.now() - start}ms`);
      console.log(`Status code: ${response.status}`);
      console.log(`Headers: ${JSON.stringify(response.headers.raw())}`);

      if (args.save) {
        const filePath = path.join(API_TESTER_PATH, `${method}-${url}.json`);
        write_file(filePath, JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else if (args._[0] === '--request-file') {
    const requestFilePath = args._[1];
    const requests = await read_file(requestFilePath);
    const requestsData = JSON.parse(requests);

    for (const request of requestsData) {
      await main(request);
    }
  } else {
    console.log('Unknown command');
  }
}

main();