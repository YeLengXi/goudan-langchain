const fetch = require('node-fetch');

const parseArgs = require('minimist');

const fs = require('fs');
const path = require('path');

const requestsDir = path.join(__dirname, '../examples/requests.json');

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args._[0]) {
    const method = args._[0].toUpperCase();
    if (!methods.includes(method)) {
      console.error(`Unsupported HTTP method: ${method}`);
      return;
    }

    const url = args._[1];
    const data = args.data || null;
    const headers = args.headers || {};

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null
      });

      const responseTime = Date.now() - start;
      const responseBody = await response.json();

      console.log(`Response Time: ${responseTime}ms`);
      console.log(`Status Code: ${response.status}`);
      console.log('Headers:', response.headers.raw());
      console.log('Body:', responseBody);

      if (args.save) {
        fs.writeFileSync(path.join(__dirname, '../responses', `${method}-${url}-${Date.now()}.json`), JSON.stringify(responseBody, null, 2));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (args.requestFile) {
    const requests = JSON.parse(fs.readFileSync(requestsDir));

    for (const request of requests) {
      await main({ ...request });
    }
  }
}

start = Date.now();
main();