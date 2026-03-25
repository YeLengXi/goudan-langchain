const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_ACCESS_TOKEN = 'YOUR_GITHUB_ACCESS_TOKEN';

const createRepository = async (projectName, isPublic, description) => {
  const repoName = isPublic ? projectName : `${projectName}-private`;
  const response = await axios.post(`${GITHUB_API_URL}/user/repos`, {
    name: repoName,
    private: !isPublic
  }, {
    headers: {
      'Authorization': `token ${GITHUB_ACCESS_TOKEN}`
    }
  });

  return response.data.clone_url;
};

const initializeLocalProject = async (templateName) => {
  const templatesDir = path.join(__dirname, 'templates');
  const templateFiles = fs.readdirSync(templatesDir);
  templateFiles.forEach(file => {
    if (file.startsWith(templateName)) {
      const content = fs.readFileSync(path.join(templatesDir, file), 'utf8');
      fs.writeFileSync(path.join(__dirname, file), content);
    }
  });
};

module.exports = {
  createRepository,
  initializeLocalProject
};