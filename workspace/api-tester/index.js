const axios = require('axios');

const parseArgs = require('minimist');

const fs = require('fs');

const path = require('path');

const { green, yellow, red } = require('chalk');

const requestsDir = path.join(__dirname, '../examples/requests.json');

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args._[0] === 'GET') {
    const url = args._[1];
    const response = await axios.get(url);
    console.log(green('Response:'), response.data);
  }

  if (args._[0] === 'POST') {
    const url = args._[1];
    const data = JSON.parse(args.data || '{}');
    const response = await axios.post(url, data);
    console.log(green('Response:'), response.data);
  }

  // Add more methods as needed
}

main().catch(err => {
  console.error(red('Error:'), err);
});