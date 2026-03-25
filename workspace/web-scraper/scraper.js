const fetch = require('node-fetch');

const cheerio = require('cheerio');

const fs = require('fs');

const program = require('commander');

program
  .version('0.1.0')
  .argument('<url>', 'url to scrape')
  .action((url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((html) => {
        const $ = cheerio.load(html);
        const title = $('title').text();
        const links = $('a').map((i, el) => $(el).attr('href')).get();
        const images = $('img').map((i, el) => $(el).attr('src')).get();
        const data = {
          title,
          links,
          images
        };
        fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

program.parse(process.argv);
