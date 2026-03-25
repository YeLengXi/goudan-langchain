const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const scraper = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const dom = new JSDOM(text);
    const title = dom.window.document.title;
    const links = Array.from(dom.window.document.querySelectorAll('a[href]')).map(link => link.href);
    const images = Array.from(dom.window.document.querySelectorAll('img[src]')).map(img => img.src);

    return {
      title,
      links,
      images
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = scraper;