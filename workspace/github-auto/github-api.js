const axios = require('axios');

const createGitHubRepository = async (token, repoName, isPublic) => {
  const response = await axios.post('https://api.github.com/user/repos', {
    name: repoName,
    private: !isPublic
  }, {
    headers: {
      Authorization: `token ${token}`
    }
  });

  return response.data;
};

module.exports = { createGitHubRepository };