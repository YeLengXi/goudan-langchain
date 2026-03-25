// Main program of the API testing tool.
// This file handles the CLI interface and HTTP requests.

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { parseArgs } = require('minimist');

// Parse command-line arguments
const args = parseArgs(process.argv.slice(2));

// Helper function to handle HTTP requests
async function sendRequest(method, url, headers, body) {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: method === 'POST' || method === 'PUT' || method === 'PATCH' ? JSON.stringify(body) : undefined
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

// Helper function to format response
function formatResponse(response) {
  return JSON.stringify(response, null, 2);
}

// Helper function to save response to file
function saveResponseToFile(response, filename) {
  fs.writeFileSync(filename, formatResponse(response));
}

// CLI interface logic
async function main() {
  if (args._[0] === 'GET') {
    const { url } = args;
    const response = await sendRequest('GET', url);
    console.log(formatResponse(response));
  } else if (args._[0] === 'POST') {
    const { url, d } = args;
    const body = JSON.parse(d);
    const response = await sendRequest('POST', url, {}, body);
    console.log(formatResponse(response));
  } // Add other HTTP methods here
  else {
    console.log('Unsupported HTTP method');
  }
}

main();