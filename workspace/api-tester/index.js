const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { parse } = require('minimist');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  const args = parse(process.argv.slice(2));

  if (args._[0] === 'GET') {
    const url = args._[1];
    const options = {
      method: 'GET'
    };
    const response = await fetch(url, options);
    console.log(await response.json());
  }

  if (args._[0] === 'POST') {
    const url = args._[1];
    const data = JSON.parse(args.data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch(url, options);
    console.log(await response.json());
  }

  // Add more methods and parsing logic here
}

main().catch(console.error);
