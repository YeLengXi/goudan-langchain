const scraper = require('./scraper.js');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node scraper.js <URL>');
  process.exit(1);
}

const url = args[0];

scraper(url).then(data => {
  console.log(JSON.stringify(data, null, 2));
}).catch(error => {
  console.error('Error:', error);
});