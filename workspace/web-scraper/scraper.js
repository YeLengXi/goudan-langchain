const fetch = require('node-fetch');

const regexTitle = /<title>(.*?)</title>/i;
const regexLinks = /<a [^>]*href="(.*?)"/gi;
const regexImages = /<img [^>]*src="(.*?)"/gi;

const scraper = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();

    const title = html.match(regexTitle)[1];
    const links = html.match(regexLinks).map(link => link.match(/href="(.*?)"/i)[1]);
    const images = html.match(regexImages).map(image => image.match(/src="(.*?)"/i)[1]);

    return {
      title,
      links,
      images
    };
  } catch (error) {
    console.error('Error fetching the webpage:', error);
    process.exit(1);
  }
};

module.exports = scraper;