// This is the main program of the API tester.
// It parses CLI arguments, sends HTTP requests, and handles responses.

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: api-tester <method> <url> [options]');
    process.exit(1);
  }

  const [method, url] = args.splice(0, 2);
  const options = args.reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    acc[key] = value;
    return acc;
  }, {});

  try {
    const response = await fetch(url, {
      method,
      headers: options.headers ? JSON.parse(options.headers) : {},
      body: options.body ? JSON.parse(options.body) : null
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

main();