const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const dotenv = require('dotenv');

dotenv.config();

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

module.exports = {
  createRepository: async (name, isPublic, description) => {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, {
      name,
      private: !isPublic
    }, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    return response.data;
  },

  initializeRepository: async (repo) => {
    const repoPath = path.join(__dirname, repo.name);
    fs.mkdirSync(repoPath, { recursive: true });
    fs.writeFileSync(path.join(repoPath, 'README.md'), await readTemplate('README'));
    fs.writeFileSync(path.join(repoPath, '.gitignore'), await readTemplate('.gitignore'));
    fs.writeFileSync(path.join(repoPath, 'LICENSE'), await readTemplate('LICENSE'));
    await exec(`git init ${repoPath}`);
    await exec(`git add . ${repoPath}`);
    await exec(`git commit -m 'Initial commit' ${repoPath}`);
  },

  pushToGitHub: async (repo) => {
    const repoPath = path.join(__dirname, repo.name);
    await exec(`git remote add origin https://github.com/${repo.full_name}.git ${repoPath}`);
    await exec(`git push -u origin main ${repoPath}`);
  },

  readTemplate: async (templateName) => {
    const templatePath = path.join(__dirname, 'templates', `${templateName}.md`);
    return fs.readFileSync(templatePath, 'utf8');
  }
};