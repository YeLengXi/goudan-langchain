const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetch = async (url, options) => {
  try {
    const response = await https.get(url, options);
    return response;
  } catch (error) {
    throw error;
  }
};

const parseArgs = (args) => {
  const result = {
    method: 'GET',
    url: '',
    data: null
  };

  args.forEach(arg => {
    if (arg.startsWith('-')) {
      if (arg === '-d') {
        result.data = JSON.parse(args[args.indexOf(arg) + 1]);
      } else if (arg.startsWith('--')) {
        const [key, value] = arg.slice(2).split('=');
        result[key] = value;
      } else {
        result.method = arg.toUpperCase();
      }
    } else {
      result.url = arg;
    }
  });

  return result;
};

const main = async () => {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  try {
    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers || {},
      body: options.data ? JSON.stringify(options.data) : null
    });

    console.log(`Status Code: ${response.statusCode}`);
    console.log(`Response Time: ${new Date().toISOString() - new Date(response.headers.date).getTime()}ms`);
    console.log(`Headers: ${JSON.stringify(response.headers)}`);

    if (response.statusCode === 200) {
      console.log(`Body: ${JSON.stringify(await response.json())}`);
    } else {
      console.error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }

  rl.close();
};

main();