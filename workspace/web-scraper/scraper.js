const fetch = require('node-fetch');

const regexTitle = /<title>(.*?)</title>/i;
const regexLinks = /<a [^>]*href="(.*?)" [^>]*>/gi;
const regexImages = /<img [^>]*src="(.*?)" [^>]*>/gi;

const scraper = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const title = html.match(regexTitle)[1];
    const links = [];
    let linkMatch;
    while ((linkMatch = regexLinks.exec(html)) !== null) {
      links.push(linkMatch[1]);n    }
    const images = [];
    let imageMatch;
    while ((imageMatch = regexImages.exec(html)) !== null) {
      images.push(imageMatch[1]);
    }

    return {
      title,
      links,
      images
    };n  } catch (error) {
    console.error('Error fetching the webpage:', error);
    return null;
  }
};

module.exports = scraper;