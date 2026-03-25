const https = require('https');
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('A command-line API testing tool');

program
  .command('GET <url>')
  .description('Perform a GET request')
  .action((url) => {
    fetchData(url, 'GET');
  });

program
  .command('POST <url> -d <data>')
  .description('Perform a POST request')
  .action((url, data) => {
    fetchData(url, 'POST', data);
  });

program
  .command('PUT <url> -d <data>')
  .description('Perform a PUT request')
  .action((url, data) => {
    fetchData(url, 'PUT', data);
  });

program
  .command('DELETE <url>')
  .description('Perform a DELETE request')
  .action((url) => {
    fetchData(url, 'DELETE');
  });

program
  .command('PATCH <url> -d <data>')
  .description('Perform a PATCH request')
  .action((url, data) => {
    fetchData(url, 'PATCH', data);
  });

program
  .command('--request-file <file>')
  .description('Load requests from a file')
  .action((file) => {
    const requests = JSON.parse(fs.readFileSync(file, 'utf8'));
    requests.forEach(request => {
      fetchData(request.url, request.method, request.data);
    });
  });

program.parse(process.argv);

async function fetchData(url, method, data = null) {
  const options = {
    method: method
  };

  if (data) {
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.headers = {
        'Content-Type': 'application/json'
      }
      data = JSON.stringify(data);
    }
  }

  try {
    const start = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    const duration = endTime - start;
    const json = await response.json();
    console.log(`Status Code: ${response.status}
Headers: ${JSON.stringify(response.headers.raw())}
Duration: ${duration}ms
Response: ${JSON.stringify(json, null, 2)}`);
  } catch (error) {
    console.error('Error:', error);
  }
}