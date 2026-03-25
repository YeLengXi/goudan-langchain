const fetch = require('node-fetch');
const cheerio = require('cheerio');

const scrape = async (url) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $("title").text();
    const links = $("a[href]").map((i, link) => $(link).attr('href')).get();
    const images = $("img[src]").map((i, img) => $(img).attr('src')).get();

    return {
      title,
      links,
      images
    }
  } catch (error) {
    throw new Error('Failed to scrape the website:', error);
  }
};

module.exports = scrape;