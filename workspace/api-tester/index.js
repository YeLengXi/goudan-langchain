const https = require('https');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('A simple API tester for command line');

program
  .command('GET <url>')
  .description('Send a GET request to the specified URL')
  .action((url) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        console.log(data);
      });
    }).on('error', (error) => {
      console.error(error);
    });
  });

program
  .command('POST <url> -d <data>')
  .description('Send a POST request to the specified URL with JSON data')
  .action((url, data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    https.request(url, options, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        console.log(data);
      });
    }).on('error', (error) => {
      console.error(error);
    });
  });

program.parse(process.argv);
