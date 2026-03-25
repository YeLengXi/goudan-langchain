# create.js

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { prompt } = require('enquirer');

const GITHUB_API = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;

const createRepository = async (name, description, isPrivate) => {
  try {
    const response = await axios.post(`${GITHUB_API}/user/repos`, {
      name,
      description,
      private: isPrivate
    }, {
      headers: {
        Authorization: `token ${TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = createRepository;