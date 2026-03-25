const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const extractTitle = (html) => {
  const regex = /<title>(.*?)</title>/i;
  const match = html.match(regex);
  return match ? match[1] : null;
};

const extractLinks = (html) => {
  const regex = /<a [^>]*href="([^"]*)"/gi;
  const links = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);n  }
  return links;
};

const extractImages = (html) => {
  const regex = /<img [^>]*src="([^"]*)"/gi;
  const images = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    images.push(match[1]);
  }
  return images;
};

const scrape = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const title = extractTitle(html);
    const links = extractLinks(html);
    const images = extractImages(html);

    const result = {
      title,
      links,
      images
    };

    const filePath = path.join(__dirname, 'result.json');
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf-8');

    return result;
  } catch (error) {
    console.error('Error scraping:', error);
    return null;
  }
};

module.exports = scrape;