const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_ACCESS_TOKEN = 'your-github-access-token';

const headers = {
  'Authorization': `token ${GITHUB_ACCESS_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json'
};

async function createRepository({ name, private: isPrivate }) {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, {
      name,
      private: isPrivate
    }, {
      headers
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create repository on GitHub');
  }
}

module.exports = {
  createRepository
};