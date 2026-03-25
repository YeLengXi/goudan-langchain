const https = require('https');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('A command-line API testing tool');

program
  .command('GET <url>')
  .alias('get')
  .description('Perform a GET request')
  .action((url) => {
    performRequest('GET', url);
  });

program
  .command('POST <url> -d <data>')
  .alias('post')
  .description('Perform a POST request')
  .action((url, data) => {
    performRequest('POST', url, data);
  });

program
  .command('PUT <url> -d <data>')
  .alias('put')
  .description('Perform a PUT request')
  .action((url, data) => {
    performRequest('PUT', url, data);
  });

program
  .command('DELETE <url>')
  .alias('del')
  .description('Perform a DELETE request')
  .action((url) => {
    performRequest('DELETE', url);
  });

program
  .command('PATCH <url> -d <data>')
  .alias('patch')
  .description('Perform a PATCH request')
  .action((url, data) => {
    performRequest('PATCH', url, data);
  });

program
  .command('--request-file <file>')
  .alias('rf')
  .description('Read requests from a file')
  .action((file) => {
    readRequestFile(file);
  });

program.parse(process.argv);

async function performRequest(method, url, data = null) {
  const options = {
    method,
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

    console.log(`Response Time: ${responseTime}ms`);
    console.log(`Status Code: ${response.status}`);
    console.log('Headers:', response.headers.raw());

    const jsonData = await response.json();
    console.log('Body:', jsonData);

    if (jsonData && jsonData.length > 0) {
      console.log('
Response JSON:', JSON.stringify(jsonData, null, 2));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function readRequestFile(file) {
  const data = await read_file({
    file_path: file
  });
  const requests = JSON.parse(data);
  requests.forEach(request => {
    performRequest(request.method, request.url, request.data);
  });
}
