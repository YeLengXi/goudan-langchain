const https = require('https');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');
const { readFileSync } = require('fs');

const API_TESTER_PATH = path.join(__dirname, 'examples', 'requests.json');

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

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
      const { statusCode, headers: responseHeaders } = response;
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve({
          statusCode,
          responseHeaders,
          body
        });
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

function parseRequestBody(method, body) {
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    if (body.startsWith('{')) {
      return JSON.parse(body);
    } else if (body.startsWith('form')) {
      return body;
    }
  }
  return null;
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  const { method, url, _ } = args;
  let body = args.d || args.data || null;

  if (!method || !url) {
    console.error('Missing method or URL.');
    process.exit(1);
  }

  if (!methods.includes(method)) {
    console.error(`Unsupported method: ${method}`);
    process.exit(1);
  }

  body = parseRequestBody(method, body);

  fetchApi(url, method, {}, body)
    .then(response => {
      console.log(`Status Code: ${response.statusCode}`);
      console.log('Headers:', response.responseHeaders);
      console.log('Body:', response.body);

      if (args.save) {
        fs.writeFileSync(args.save, JSON.stringify(response, null, 2));
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

run();