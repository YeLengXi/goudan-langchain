const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const portfolioData = JSON.parse(fs.readFileSync(path.join(__dirname, 'portfolio.json')));

app.get('/', (req, "res") => {
	const template = fs.readFileSync(path.join(__dirname, 'templates/default.html'), 'utf-8');
	const filledTemplate = template.replace(/{{(.*?)}}/g, (match, key) => {
		if (key === 'name') {
			return portfolioData.name;
		} else if (key === 'position') {
			return portfolioData.position;
		} else if (key === 'bio') {
			return portfolioData.bio;
		} else if (key === 'skills') {
			return portfolioData.skills.join(', ');
		} else if (key === 'projects') {
			let projectsHtml = '<ul>';
			portfolioData.projects.forEach(project => {
				projectsHtml += `<li>${project.name} - ${project.description}</li>`;
			});
			projectsHtml += '</ul>';
			return projectsHtml;
		} else if (key === 'social_links') {
			let socialLinksHtml = '<ul>';
			portfolioData.social_links.forEach(link => {
				socialLinksHtml += `<li><a href="${link.url}">${link.name}</a></li>`;
			});
			socialLinksHtml += '</ul>';
			return socialLinksHtml;
		}
	});
	res.send(filledTemplate);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});