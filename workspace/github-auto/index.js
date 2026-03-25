const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const createRepository = async (name, isPublic, description) => {
  const token = process.env.GITHUB_TOKEN;
  const apiUrl = 'https://api.github.com/user/repos';
  const body = {
    name,
    private: !isPublic
  }

  if (description) {
    body.description = description;
  }

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    return response.data.clone_url;
  } catch (error) {
    throw new Error('Failed to create repository: ' + error.message);
  }
}

const initRepository = async (url) => {
  const cmd = `git init && git remote add origin ${url} && git fetch origin main && git checkout main && git branch -m main main && git push -u origin main`; 
  try {
    await exec_command(cmd);
    console.log('Repository initialized successfully.');
  } catch (error) {
    throw new Error('Failed to initialize repository: ' + error.message);
  }
}

const pushToGitHub = async (url) => {
  const cmd = `git remote add origin ${url} && git push -u origin main`; 
  try {
    await exec_command(cmd);
    console.log('Repository pushed to GitHub successfully.');
  } catch (error) {
    throw new Error('Failed to push to GitHub: ' + error.message);
  }
}

module.exports = {
  createRepository,
  initRepository,
  pushToGitHub
};