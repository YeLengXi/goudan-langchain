#!/usr/bin/env node
require('./scraper');

const program = require('commander');

program
  .version('1.0.0')
  .argument('<url>', 'url to scrape')
  .action((url) => {
    require('./scraper')(url)
      .then(data => {
        console.log(JSON.stringify(data, null, 2));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

program.parse(process.argv);
