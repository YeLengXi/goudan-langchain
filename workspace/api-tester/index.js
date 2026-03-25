const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const executeCommand = async (command) => {
  const [method, url, ...options] = command.split(' ');
  let data = null;
  let headers = {
    'Content-Type': 'application/json'
  };

  if (options.includes('-d')) {
    const dataIndex = options.indexOf('-d') + 1;
    data = JSON.parse(options[dataIndex]);
    headers['Content-Type'] = 'application/json';
  }

  const optionsObject = {
    method: method,
    headers: headers
  }

  if (data) {
    optionsObject.body = JSON.stringify(data);
  }

  try {
    const startTime = Date.now();
    const response = await fetch(url, optionsObject);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`Response Time: ${responseTime}ms`);
    console.log(`Status Code: ${response.status}`);
    console.log('Headers:', response.headers.raw());

    const json = await response.json();
    console.log('Body:', JSON.stringify(json, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

rl.on('line', (input) => {
  executeCommand(input.trim());
});
rl.on('close', () => {
  process.exit(0);
});