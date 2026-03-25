const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('minimist');

const DEFAULT_REQUEST_FILE = 'requests.json';

function fetchApi(url, method, headers, body) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers
    }

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.body = body;
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
    }).on('error', error => {
      reject(error);
    });
  });
}

function parseRequestFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function main() {
  const args = parse(process.argv.slice(2));

  if (args._[0] === 'GET') {
    fetchApi(args._[1], 'GET', {}, '').then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
  }

  if (args._[0] === 'POST') {
    fetchApi(args._[1], 'POST', {}, JSON.stringify(args.d)).then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
  }

  if (args._[0] === '--request-file') {
    const requests = parseRequestFile(args._[1] || DEFAULT_REQUEST_FILE);
    requests.forEach(request => {
      fetchApi(request.url, request.method, request.headers, request.body).then(response => {
        console.log(response);
      }).catch(error => {
        console.error(error);
      });
    });
  }
}

main();