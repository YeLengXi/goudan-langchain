const https = require('https');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('A command-line API testing tool');

program
  .command('GET <url>')
  .alias('get')
  .description('Send a GET request to the specified URL')
  .action((url) => {
    sendRequest('GET', url);
  });

program
  .command('POST <url> -d <data>')
  .alias('post')
  .description('Send a POST request to the specified URL with JSON data')
  .action((url, data) => {
    sendRequest('POST', url, data);
  });

program
  .command('PUT <url> -d <data>')
  .alias('put')
  .description('Send a PUT request to the specified URL with JSON data')
  .action((url, data) => {
    sendRequest('PUT', url, data);
  });

program
  .command('DELETE <url>')
  .alias('del')
  .description('Send a DELETE request to the specified URL')
  .action((url) => {
    sendRequest('DELETE', url);
  });

program
  .command('PATCH <url> -d <data>')
  .alias('patch')
  .description('Send a PATCH request to the specified URL with JSON data')
  .action((url, data) => {
    sendRequest('PATCH', url, data);
  });

program
  .command('--request-file <file>')
  .alias('rf')
  .description('Send requests from a file')
  .action((file) => {
    readRequestsFromFile(file);
  });

program.parse(process.argv);

function sendRequest(method, url, data = null) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers['Content-Length'] = Buffer.byteLength(data);
  }

  const options = {
    method: method,
    headers: headers
  }

  if (data) {
    options.body = data;
  }

  https.get(url, response => {
    const { statusCode } = response;
    const headers = response.headers;
    const startTime = Date.now();

    response.on('data', d => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log(`Status Code: ${statusCode}
Headers: ${JSON.stringify(headers)}
Response Time: ${duration}ms
Data: ${JSON.stringify(d)}`);
    });
  }).on('error', e => {
    console.error(`Error: ${e.message}`);
  });
}

function readRequestsFromFile(file) {
  const requests = require('fs').readFileSync(file, 'utf8');
  const parsedRequests = JSON.parse(requests);
  parsedRequests.forEach(request => {
    sendRequest(request.method, request.url, request.data);
  });
}