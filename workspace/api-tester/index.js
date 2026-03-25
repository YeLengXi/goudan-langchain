const https = require('https');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('A command-line API testing tool.');

program
  .command('GET <url>')
  .description('Perform a GET request to the specified URL.')
  .action((url) => {
    performRequest('GET', url);
  });

program
  .command('POST <url> -d <data>')
  .description('Perform a POST request to the specified URL with JSON data.')
  .action((url, data) => {
    performRequest('POST', url, data);
  });

program
  .command('PUT <url> -d <data>')
  .description('Perform a PUT request to the specified URL with JSON data.')
  .action((url, data) => {
    performRequest('PUT', url, data);
  });

program
  .command('DELETE <url>')
  .description('Perform a DELETE request to the specified URL.')
  .action((url) => {
    performRequest('DELETE', url);
  });

program
  .command('PATCH <url> -d <data>')
  .description('Perform a PATCH request to the specified URL with JSON data.')
  .action((url, data) => {
    performRequest('PATCH', url, data);
  });

program
  .command('--request-file <file>')
  .description('Perform requests from a file.')
  .action((file) => {
    performRequestsFromFile(file);
  });

program.parse(process.argv);

async function performRequest(method, url, data = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const start = Date.now();
    const response = await fetch(url, options);
    const endTime = Date.now();
    const responseTime = endTime - start;
    const json = await response.json();
    console.log(`Response Time: ${responseTime}ms`);
    console.log('Status Code:', response.status);
    console.log('Headers:', response.headers);
    console.log('Body:', json);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function performRequestsFromFile(file) {
  const data = JSON.parse(await read_file({"file_path": "<file_path>"}));
  for (const request of data.requests) {
    await performRequest(request.method, request.url, request.data);
  }
}
