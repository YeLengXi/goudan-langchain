const https = require('https');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');
const { JSDOM } = require('jsdom');

const API_TESTER_PATH = path.join(__dirname, 'examples', 'requests.json');

function fetchApi(url, method, headers, body) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers
    }

    if (body) {
      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        options.headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
      }
    }

    https.get(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          body: JSON.parse(data)
        });
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

function parseRequestFile(filePath) {
  const requests = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return requests.map(request => {
    return fetchApi(request.url, request.method, request.headers, request.body);
  });
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  if (args._[0]) {
    const method = args._[0].toUpperCase();
    const url = args._[1];
    let headers = {};
    let body = null;

    if (args.h) {
      headers = args.h;
    }
    if (args.d) {
      body = JSON.parse(args.d);
    }

    fetchApi(url, method, headers, body).then(response => {
      console.log(JSON.stringify(response, null, 2));
    }).catch(error => {
      console.error(error);
    });
  } else if (args['request-file']) {
    const filePath = args['request-file'];
    parseRequestFile(filePath).then(results => {
      results.forEach(result => {
        console.log(JSON.stringify(result, null, 2));
      });
    }).catch(error => {
      console.error(error);
    });
  }
}

run();