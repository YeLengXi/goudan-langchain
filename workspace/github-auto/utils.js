const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';

const createRepo = async (owner, name, isPublic, description) => {
  const token = 'YOUR_GITHUB_TOKEN';
  const { data } = await axios.post(`${GITHUB_API_URL}/user/repos`, {
    name,
    description,
    private: !isPublic
  }, {
    headers: {
      Authorization: `token ${token}
    }
  });

  return data;
};

const listRepos = async (owner) => {
  const token = 'YOUR_GITHUB_TOKEN';
  const { data } = await axios.get(`${GITHUB_API_URL}/users/${owner}/repos`);

  return data;
};

module.exports = {
  createRepo,
  listRepos
};