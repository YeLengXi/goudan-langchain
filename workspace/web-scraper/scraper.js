const fetch = require('node-fetch');

const regexTitle = /<title>(.*?)</title>/g;
const regexLinks = /<a [^>]*href="([^"]+)"/g;
const regexImages = /<img [^>]*src="([^"]+)"/g;

const scraper = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();

    const title = text.match(regexTitle);
    const links = text.match(regexLinks);
    const images = text.match(regexImages);

    return {
      title: title ? title[1] : null,
      links: links ? links.map(link => link.split('/')[4]) : [],
      images: images ? images.map(image => image.split('/')[4]) : [],
    }
  } catch (error) {
    console.error('Error fetching the URL:', error);
    return null;
  }
};

module.exports = scraper;