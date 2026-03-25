const fetch = require('node-fetch');

const regexTitle = /<title>(.*?)</title>/i;
const regexLinks = /<a href="(.*?)">/gi;
const regexImages = /<img src="(.*?)"/gi;

const scraper = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();

    const title = regexTitle.exec(text);
    const links = regexLinks.exec(text);
    const images = regexImages.exec(text);

    return {
      title: title[1],
      links: links.map(link => link[1]),
      images: images.map(image => image[1]),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = scraper;