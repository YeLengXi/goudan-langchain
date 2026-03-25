module.exports = {
  fetchPageContent: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      throw new Error(`Failed to fetch page content: ${error.message}`);
    }
  },

  extractTitle: (html) => {
    const titleMatch = html.match(/<title>(.*?)</title>/);
    return titleMatch ? titleMatch[1] : null;
  },

  extractLinks: (html) => {
    const linkMatch = html.match(/<a [^>]*href="([^"]+)"/g);
    return linkMatch ? linkMatch.map(link => link.match(/href="([^"]+)"/)[1]) : [];
  },

  extractImages: (html) => {
    const imageMatch = html.match(/<img [^>]*src="([^"]+)"/g);
    return imageMatch ? imageMatch.map(image => image.match(/src="([^"]+)"/)[1]) : [];
  }
};