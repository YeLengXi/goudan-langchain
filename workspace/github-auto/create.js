const fs = require('fs');
const path = require('path');
const { createRepository } = require('./createRepository');

const createPublicRepository = async (name) => {
  const token = 'YOUR_GITHUB_TOKEN';
  const repository = await createRepository(token, name, false);

  console.log('Repository created:', repository.html_url);
};

const createPrivateRepository = async (name) => {
  const token = 'YOUR_GITHUB_TOKEN';
  const repository = await createRepository(token, name, true);

  console.log('Repository created:', repository.html_url);
};

module.exports = {
  createPublicRepository,
  createPrivateRepository
};