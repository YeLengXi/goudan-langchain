// Main program of the API tester
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);

// Parse request method
const method = args[0];

// Parse URL
const url = args[1];

// Parse request data
let data;
if (args.includes('-d')) {
  const dataIndex = args.indexOf('-d') + 1;
  data = JSON.parse(args[dataIndex]);
}

// Parse request headers
let headers = {};
if (args.includes('-h')) {
  const headersIndex = args.indexOf('-h') + 1;
  headers = JSON.parse(args[headersIndex]);
}

// Make HTTP request
async function makeRequest() {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: data ? JSON.stringify(data) : null
    });
    const responseTime = new Date().getTime() - Date.now();
    const responseData = await response.json();
    console.log(`Response Time: ${responseTime}ms`);
    console.log(`Status Code: ${response.status}`);
    console.log(`Headers: ${JSON.stringify(response.headers.raw())}`);
    console.log(`Response Data: ${JSON.stringify(responseData, null, 2)}`);
    // Save response to file
    fs.writeFileSync(path.join(__dirname, 'response.json'), JSON.stringify(responseData, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the program
makeRequest();