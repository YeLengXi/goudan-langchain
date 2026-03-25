// This is the main program of the API testing tool.

const fetch = require('node-fetch');

const parseArgs = require('minimist');

const fs = require('fs');
const path = require('path');

const requestsPath = path.join(__dirname, '../examples/requests.json');

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args._[0] === 'GET') {
    const response = await fetch(args._[1]);
    console.log(await response.json());
  }

  if (args._[0] === 'POST') {
    const response = await fetch(args._[1], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args.d)
    });
    console.log(await response.json());
  }

  // Add more methods and parsing for other arguments here
}

main().catch(console.error);