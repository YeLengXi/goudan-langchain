module.exports = {
	async scrapePage(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const text = await response.text();
			const title = text.match(/<title>(.*?)</title>/)[1];
			const links = text.match(/<a [^>]*href="([^"]*)"/g);
			const images = text.match(/<img [^>]*src="([^"]*)"/g);
			return {
				title,
				links,
				images
			};
		}
		catch (error) {
			console.error('Error fetching the page:', error);
		}
	}
};