const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
  async scrape(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const html = await response.text();
      const $ = cheerio.load(html);
      const title = $("title").text();
      const links = $("a").map((i, elem) => $(elem).attr('href')).get();
      const images = $("img").map((i, elem) => $(elem).attr('src')).get();
      return {
        title,
        links,
        images
      };
    } catch (error) {
      console.error('Error fetching or parsing the page:', error);
      return null;
    }
  }
};