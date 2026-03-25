const axios = require('axios');
require('dotenv').config();

const GITHUB_API_URL = 'https://api.github.com';

module.exports = {
  createRepository: async (repoName, isPublic, description) => {
    try {
      const response = await axios.post(
        `${GITHUB_API_URL}/user/repos`,
        {
          name: repoName,
          private: !isPublic,
          description: description,
        },
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating repository:', error);
      throw error;
    }
  },
};