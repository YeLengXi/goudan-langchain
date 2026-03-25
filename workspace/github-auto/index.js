const axios = require('axios');

const apiUrl = 'https://api.github.com';
const gitUrl = 'https://github.com';

const createRepository = async (username, repositoryName, isPrivate, description) => {
  const token = 'YOUR_GITHUB_TOKEN';
  const response = await axios.post(`${apiUrl}/user/repos`, {
    name: repositoryName,
    private: isPrivate,
    description
  }, {
    headers: {
      Authorization: `token ${token}`,
    }
  });

  return response.data.clone_url;
};

const initializeGit = async (repositoryUrl) => {
  const command = `git init
  git remote add origin ${repositoryUrl}
  git add .
  git commit -m 'Initial commit'
  git push -u origin main`;
  exec_command(command);
};

const pushToGitHub = async (repositoryUrl) => {
  const command = `git push origin main`; 
  exec_command(command);
};

module.exports = {
  createRepository,
  initializeGit,
  pushToGitHub
};