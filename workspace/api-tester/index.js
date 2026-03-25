const https = require('https');
const fs = require('fs');
const path = require('path');

const parseArgs = require('minimist');

const fetch = async (url, options) => {
  try {
    const response = await https.get(url, options);
    const data = await response promisedata();
    return { status: response.statusCode, data, headers: response.headers };
  } catch (error) { 
    throw error;
  }
};

const formatResponse = (response) => {
  console.log(`Status Code: ${response.status}
Headers: ${JSON.stringify(response.headers)}
Response Time: ${new Date().toISOString()}
Data: ${JSON.stringify(response.data, null, 2)}`);
};

const saveResponseToFile = (response, filePath) => {
  fs.writeFileSync(filePath, JSON.stringify(response, null, 2));
};

const main = async () => {
  const args = parseArgs(process.argv.slice(2));

  let { method, url, data, requestFile } = args;

  if (requestFile) {
    const content = fs.readFileSync(requestFile, 'utf-8');
    const requests = JSON.parse(content);
    for (const request of requests) {
      const response = await fetch(request.url, { method: request.method, headers: request.headers, body: request.body });
      formatResponse(response);
    }
  } else {
    const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: data ? JSON.stringify(data) : null });
    formatResponse(response);
  }
};

main().catch(console.error);
