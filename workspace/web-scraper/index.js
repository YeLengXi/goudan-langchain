const scraper = require('./scraper');

module.exports = {
  run: async (url) => {
    try {
      const result = await scraper.scrape(url);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
}