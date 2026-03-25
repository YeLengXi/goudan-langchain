const fetch = require('node-fetch');

const scrape = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();

    const title = html.match(/<title>(.*?)</title>/)[1];
    const links = html.match(/<a [^>]*href="([^"]+)"/g);
    const images = html.match(/<img [^>]*src="([^"]+)"/g);

    return {
      title,
      links,
      images
    }
  } catch (error) {
    console.error('Error scraping the webpage:', error);
    process.exit(1);
  }
};

const main = async () => {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node scraper.js <URL>');
    process.exit(1);
  }

  const url = args[0];
  const result = await scrape(url);
  console.log(JSON.stringify(result, null, 2));
};

main();