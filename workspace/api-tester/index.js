const https = require('https');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const commands = {
  'GET': fetch,
  'POST': fetch,
  'PUT': fetch,
  'DELETE': fetch,
  'PATCH': fetch
};

const parseArgs = (args) => {
  const [command, url, ...options] = args;
  let method = 'GET';
  let data = null;
  let headers = {};

  options.forEach(option => {
    if (option.startsWith('-d ')) {
      data = JSON.parse(option.substring(3));
    } else if (option.startsWith('-H ')) {
      const [key, value] = option.substring(2).split(':');
      headers[key] = value;
    }
  });

  return { command, url, method, data, headers };
};

const run = async (args) => {
  const { command, url, method, data, headers } = parseArgs(args);
  const options = {
    method,
    headers
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await commands[method](url, options);
    const { status, headers: responseHeaders, body } = response;
    const responseBody = await response.text();
    console.log(`Status: ${status}
Headers: ${JSON.stringify(responseHeaders)}
Body: ${responseBody}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = { run };