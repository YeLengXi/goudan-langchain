const fetch = require('node-fetch');

const parseArgs = require('minimist');

const fs = require('fs');
const path = require('path');

const requestsDir = path.join(__dirname, 'examples');

const DEFAULT_REQUEST_FILE = 'requests.json';

async function main() {
  const args = parseArgs(process.argv.slice(2));

  let method = args._[0];
  let url = args._[1];
  let data = args.d || args.data;
  let requestFile = args.r || args.requestFile || DEFAULT_REQUEST_FILE;

  if (!method || !url) {
    console.error('Usage: api-tester <method> <url> [-d <data>] [--request-file <file>]
');    return;
  }

  if (args.h) {
    console.log('Available methods: GET, POST, PUT, DELETE, PATCH');
    console.log('Available options: -d <data>, --data <data>, -h, --help, --request-file <file>');    return;
  }

  try {
    const request = JSON.parse(data);
    data = request;
  } catch (e) {
    // data is not in JSON format
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => {
    console.log('Response time:', response.headers.get('X-Response-Time'));    console.log('Status code:', response.status);
    console.log('Headers:', response.headers);
    return response.json();
  }).catch(error => {
    console.error('Error:', error);
  });

  console.log('Response:', response);

  if (args.o) {
    const responseFile = args.o;
    fs.writeFileSync(responseFile, JSON.stringify(response, null, 2), 'utf8');
    console.log(`Response saved to ${responseFile}`);
  }
}

main();