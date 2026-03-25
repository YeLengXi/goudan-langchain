const axios = require('axios');const { read_file } = require('./utils');const token = read_file('./token.txt').trim();const BASE_URL = 'https://api.github.com';

module.exports = {
  createRepository: async (name, isPrivate) => {
    const response = await axios.post(`${BASE_URL}/user/repos`, {
      name,
      private: isPrivate
    }, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    return response.data;
  },

  getRepository: async (name) => {
    const response = await axios.get(`${BASE_URL}/repos/${name}`);
    return response.data;
  }
};