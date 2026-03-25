const fetch = require('node-fetch');

const cheerio = require('cheerio');

const scrape = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('title').text();
    const links = $('a[href]').map((i, link) => $(link).attr('href')).get();
    const images = $('img[src]').map((i, img) => $(img).attr('src')).get();

    return {
      title,
      links,
      images
    };
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const main = async () => {
  const url = 'https://example.com'; // 示例 URL
  const result = await scrape(url);
  console.log(JSON.stringify(result, null, 2));
};

main();