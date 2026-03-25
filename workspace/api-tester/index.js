const axios = require('axios');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

async function testApi(method, url, data, headers) {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers
    });
    console.log('Response:', response.data);
    console.log('Status Code:', response.status);
    console.log('Headers:', response.headers);
    console.log('Time:', new Date().toISOString());
  } catch (error) {
    console.error('Error:', error);
  }
}

if (argv._[0]) {
  const [method, url] = argv._[0].split(' ');
  if (methods.includes(method.toUpperCase())) {
    if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' || method.toUpperCase() === 'PATCH') {
      data = JSON.parse(argv.d || '{}');
    }
    headers = argv.h ? { ...argv.h } : {};
    testApi(method.toUpperCase(), url, data, headers);
  } else {
    console.error('Invalid method. Supported methods: GET, POST, PUT, DELETE, PATCH');
  }
} else if (argv.requestFile) {
  const requests = require('fs').readFileSync(argv.requestFile, 'utf-8').toString();
  const parsedRequests = JSON.parse(requests);
  parsedRequests.forEach(request => {
    testApi(request.method, request.url, request.data, request.headers);
  });
} else {
  console.error('Please provide a valid command. Usage: api-tester [method] [url] [-d data] [-h headers] [--request-file file]');
}
