const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');
const { read_file, write_file, exec_command, list_directory } = require('./utils');

const API_TESTER_PATH = path.join(__dirname, 'examples');
const CONFIG_FILE = path.join(API_TESTER_PATH, 'requests.json');

async function main() {
  const args = parse(process.argv.slice(2));

  if (args._[0] === 'GET' || args._[0] === 'POST' || args._[0] === 'PUT' || args._[0] === 'DELETE' || args._[0] === 'PATCH') {
    const url = args._[1];
    const method = args._[0];
    const headers = args.headers || {};
    const body = args.body ? JSON.parse(args.body) : null;
    const data = args.data;

    const options = {
      method: method,
      headers: headers
    };

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.body = JSON.stringify(body);
    }

    try {
      const start = Date.now();
      const response = await fetch(url, options);
      const endTime = Date.now();

      console.log(`Response time: ${endTime - start}ms`);
      console.log(`Status code: ${response.status}`);
      console.log(`Headers: ${JSON.stringify(response.headers.raw())}`);

      const data = await response.json();
      console.log('Data:', JSON.stringify(data, null, 2));

      if (args.save) {
        await write_file(
          path.join(API_TESTER_PATH, `${method.toLowerCase()} ${url}.json`),
          JSON.stringify(data, null, 2)
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else if (args._[0] === '--request-file') {
    const requestFile = args._[1];
    const data = await read_file(requestFile);
    const requests = JSON.parse(data);
    for (const request of requests) {
      await main(request);
    }
  } else {
    console.log('Unknown command');
  }
}

main();