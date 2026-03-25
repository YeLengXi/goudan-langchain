const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_ACCESS_TOKEN = 'YOUR_GITHUB_ACCESS_TOKEN';

const headers = {
  'Authorization': `token ${GITHUB_ACCESS_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json'
};

async function createRepository(name, isPrivate, description) {
  const response = await axios.post(`${GITHUB_API_URL}/user/repos`, {
    name,
    private: isPrivate,
    description
  }, {
    headers
  });

  return response.data;
}

module.exports = {
  createRepository
};