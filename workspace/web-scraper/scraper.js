module.exports = {
  fetch: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Fetching error:', error);
      throw error;
    }
  },
  extractTitle: (html) => {
    const regex = /<title>(.*?)</title>/i;
    const match = html.match(regex);
    return match ? match[1] : null;
  },
  extractLinks: (html) => {
    const regex = /<a [^>]*href="([^"]+)"/gi;
    const matches = html.matchAll(regex);
    const links = [];
    for (const match of matches) {
      links.push(match[1]);
    }
    return links;
  },
  extractImages: (html) => {
    const regex = /<img [^>]*src="([^"]+)"/gi;
    const matches = html.matchAll(regex);
    const images = [];
    for (const match of matches) {
      images.push(match[1]);
    }
    return images;
  },
  scrape: async (url) => {
    const html = await fetch(url);
    const title = extractTitle(html);
    const links = extractLinks(html);
    const images = extractImages(html);
    return {
      title,
      links,
      images
    }
  }
};