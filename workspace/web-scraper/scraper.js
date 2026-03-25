const fetch = require('node-fetch');

const scraper = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();

    const titleRegex = /<title>(.*?)</title>/gi;
    const linksRegex = /<a [^>]*href="([^"]+)"/gi;
    const imagesRegex = /<img [^>]*src="([^"]+)"/gi;

    const title = html.match(titleRegex) ? html.match(titleRegex)[0].replace('<title>', '').replace('</title>', '') : '';
    const links = [...html.matchAll(linksRegex)].map(match => match[1]);
    const images = [...html.matchAll(imagesRegex)].map(match => match[1]);

    return {
      title,
      links,
      images
    };
  } catch (error) {
    console.error('Error fetching the webpage:', error);
    return null;
  }
};

module.exports = scraper;