const https = require('https');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readline = require('readline');
const { parseArgs } = require('minimist');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const exec = promisify(exec_command);

const API_TESTER_PATH = path.join(__dirname, '../', 'api-tester');
const EXAMPLES_PATH = path.join(__dirname, '../', 'api-tester/examples');

const requests = require(path.join(EXAMPLES_PATH, 'requests.json'));

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args._[0] === '--request-file') {
    const requestFile = args._[1];
    const content = await readFile(requestFile, 'utf8');
    const requestsData = JSON.parse(content);
    requests = requestsData.requests;
  }

  requests.forEach(async (request) => {
    const { method, url, body } = request;
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const start = Date.now();
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const endTime = Date.now();
      console.log(`Response time: ${endTime - start}ms`);
      console.log('Status Code:', response.status);
      console.log('Headers:', response.headers.raw());
      console.log('Data:', data);
      await writeFile(path.join(API_TESTER_PATH, 'responses', `response-${Date.now()}.json`), JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

main();