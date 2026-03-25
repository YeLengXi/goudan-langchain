const https = require('https');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const fetch = async (url, options) => {
  try {
    const response = await https.get(url, options);
    return response;
  } catch (error) {
    throw error;
  }
};

const formatResponse = (response) => {
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
};

const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  const method = args._[0];
  const url = args._[1];
  const data = args.d ? JSON.parse(args.d) : null;
  const headers = args.h ? JSON.parse(args.h) : {};

  const options = {
    method,
    headers,
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    formatResponse(response);
  } catch (error) {
    console.error(error);
  }
};

module.exports = main;