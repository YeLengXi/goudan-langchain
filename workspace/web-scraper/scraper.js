const fetch = require('node-fetch');

const regexTitle = /<title>(.*?)</title>/g;
const regexLinks = /<a\s+href="(.*?)">/g;
const regexImages = /<img\s+src="(.*?)"/g;

const scraper = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const title = html.match(regexTitle)[1];
    const links = html.match(regexLinks).map(link => link.match(/href="(.*?)"/)[1]);
    const images = html.match(regexImages).map(image => image.match(/src="(.*?)"/)[1]);

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