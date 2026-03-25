const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const scraper = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const dom = new JSDOM(html);
    const title = dom.window.document.title;
    const links = dom.window.document.querySelectorAll('a[href]').map(link => link.href);
    const images = dom.window.document.querySelectorAll('img[src]').map(img => img.src);

    return {
      title,
      links,
      images
    };
  } catch (error) {
    console.error('Error fetching the URL:', error);
    process.exit(1);
  }
};

module.exports = scraper;