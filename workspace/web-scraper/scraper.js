module.exports = {
  fetchHTML: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      throw new Error(`Failed to fetch ${url}: ${error.message}`);
    }
  },

  extractTitle: (html) => {
    const titleMatch = html.match(/<title>(.*?)</title>/);
    return titleMatch ? titleMatch[1] : null;
  },

  extractLinks: (html) => {
    const linkMatch = html.match(/<a [^>]*href=['"]([^'"]+)['"]/g);
    return linkMatch ? linkMatch.map(link => link.replace(/<a [^>]*href=['"]([^'"]+)['"]/g, '$1')) : [];
  },

  extractImages: (html) => {
    const imageMatch = html.match(/<img [^>]*src=['"]([^'"]+)['"]/g);
    return imageMatch ? imageMatch.map(image => image.replace(/<img [^>]*src=['"]([^'"]+)['"]/g, '$1')) : [];
  },

  scrape: async (url) 
  {
    const html = await fetchHTML(url);
    const title = extractTitle(html);
    const links = extractLinks(html);
    const images = extractImages(html);
    return {
      title,
      links,
      images
    }
  }
}