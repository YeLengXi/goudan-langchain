const https = require('https');
const { program } = require('commander');
const fs = require('fs');

const executeRequest = async (method, url, headers, body) => {
    const options = {
        method,
        headers
    }

    if (body) {
        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            options.headers['Content-Type'] = 'application/json';
            body = JSON.stringify(body);
        }
    }

    try {
        const start = Date.now();
        const response = await https.get(url, options);
        const endTime = Date.now();
        console.log(`Response time: ${endTime - start}ms`);
        console.log(`Status Code: ${response.statusCode}`);
        console.log('Headers:', response.headers);
        const data = await response.json();
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};

program
    .command('GET <url>', 'Send a GET request to the specified URL')
    .action((url) => {
        executeRequest('GET', url);
    })
    .command('POST <url> -d <data>', 'Send a POST request to the specified URL with JSON data')
    .action((url, data) => {
        executeRequest('POST', url, {}, JSON.parse(data));
    })
    .command('PUT <url> -d <data>', 'Send a PUT request to the specified URL with JSON data')
    .action((url, data) => {
        executeRequest('PUT', url, {}, JSON.parse(data));
    })
    .command('DELETE <url>', 'Send a DELETE request to the specified URL')
    .action((url) => {
        executeRequest('DELETE', url);
    })
    .command('PATCH <url> -d <data>', 'Send a PATCH request to the specified URL with JSON data')
    .action((url, data) => {
        executeRequest('PATCH', url, {}, JSON.parse(data));
    })
    .command('--request-file <file>', 'Execute requests from a file')
    .action((file) => {
        const requests = JSON.parse(fs.readFileSync(file, 'utf8'))
        requests.forEach(request => {
            executeRequest(request.method, request.url, request.headers, request.body);
        });
    })

program.parse(process.argv);
