const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const API_TESTER_PATH = path.join(__dirname, 'examples/requests.json');

function fetchApi(url, method, headers, body) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers
    }

    if (body) {
      options.body = body;
    }

    https.get(url, response => {
      const { statusCode } = response;
      const headers = response.headers;
      const chunks = [];
      response.on('data', chunk => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve({ statusCode, headers, body });
      });
    }).on('error', error => {
      reject(error);
    });
  });
}

function parseArgs(args) {
  const parsedArgs = parse(args);
  return parsedArgs;
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  const { method, url, requestFile } = args;

  if (requestFile) {
    const requests = JSON.parse(fs.readFileSync(requestFile, 'utf-8'));
    requests.forEach(request => {
      fetchApi(request.url, request.method, request.headers, request.body).then(response => {
        console.log(`Response: ${JSON.stringify(response)}`);
      }).catch(error => {
        console.error(`Error: ${error}`);
      });
    });
  } else if (method && url) {
    const headers = {};
    if (args.headers) {
      headers = JSON.parse(args.headers);
    }

    let body = null;
    if (args.d) {
      body = JSON.parse(args.d);
    }

    fetchApi(url, method, headers, body).then(response => {
      console.log(`Response: ${JSON.stringify(response)}`);
    }).catch(error => {
      console.error(`Error: ${error}`);
    });
  } else {
    console.error('Error: Invalid arguments.
Usage: api-tester [GET|POST|PUT|DELETE|PATCH] [URL] [-d JSON] [--headers JSON] [--request-file FILE]');
  }
}

run();