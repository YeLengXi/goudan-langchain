const https = require('https');
const { parse } = require('minimist');
const fs = require('fs');
const path = require('path');

const fetch = (url, options) => {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      const data = [];
      response.on('data', chunk => {
        data.push(chunk);
      });
      response.on('end', () => {
        resolve(Buffer.concat(data).toString());
      });
    }).on('error', error => {
      reject(error);
    });
  });
};

const parseOptions = options => {
  const { method, url, data, headers } = parse(options);
  let parsedData = data ? JSON.parse(data) : null;

  if (headers && headers['Content-Type'] === 'application/json') {
    parsedData = JSON.stringify(parsedData);
  }

  return {
    method,
    url,
    headers: headers || {},
    body: parsedData
  };
};

const program = require('commander');

program
  .version('1.0.0')
  .description('A command-line API testing tool')
  .command('GET <url>')
  .action(url => {
    console.log(`GET request to ${url}`);
  })
  .command('POST <url> -d <data>')
  .action((url, data) => {
    console.log(`POST request to ${url} with data: ${data}`);
  })
  .command('PUT <url> -d <data>')
  .action((url, data) => {
    console.log(`PUT request to ${url} with data: ${data}`);
  })
  .command('DELETE <url>')
  .action(url => {
    console.log(`DELETE request to ${url}`);
  })
  .command('PATCH <url> -d <data>')
  .action((url, data) => {
    console.log(`PATCH request to ${url} with data: ${data}`);
  })
  .parseprocess.argv;

module.exports = {
  fetch,
  parseOptions
};