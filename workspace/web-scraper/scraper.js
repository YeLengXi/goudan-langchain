const fetch = require('node-fetch');

const regexTitle = /<title>(.*?)</title>/i;
const regexLinks = /<a [^>]*href="([^"]+)"/gi;
const regexImages = /<img [^>]*src="([^"]+)"/gi;

const scraper = async (url) => {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const title = html.match(regexTitle)[1];
    const links = html.match(regexLinks).map((match) => match[1]);
    const images = html.match(regexImages).map((match) => match[1]);

    return {
      title,
      links,
      images
    };
  } catch (error) {
    throw new Error('Failed to fetch or parse the webpage');
  }
};

module.exports = scraper;