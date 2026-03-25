const axios = require('axios');

const apiUrl = 'https://api.github.com';

const createRepo = async (username, repoName, isPublic, description) => {
  const token = 'YOUR_GITHUB_TOKEN';
  const { data } = await axios.post(`${apiUrl}/user/repos`, {
    name: repoName,
    description,
    private: !isPublic
  }, {
    headers: {
      Authorization: `token ${token}`
    }
  });

  return data;
};

module.exports = {
  createRepo
};