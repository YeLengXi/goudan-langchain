const https = require('https');
const { parse } = require('minimist');
const fs = require('fs');
const path = require('path');

const fetch = (url, options) => {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', error => {
      reject(error);
    });
  });
};

const main = async () => {
  const args = parse(process.argv.slice(2));
  let method = args._[0];
  let url = args._[1];
  let data = args.d || null;

  if (method && url) {
    try {
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : null
      };

      const response = await fetch(url, options);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('Invalid arguments.');
  }
};

main();