# push.js

const git = require('simple-git-promise');
const fs = require('fs');
const path = require('path');
const { prompt } = require('enquirer');

const pushRepo = async () => {
  const repoPath = path.join(__dirname, '../', 'projects', 'nodejs');
  const gitInstance = git(repoPath);

  await gitInstance.init();
  await gitInstance.add('.');
  await gitInstance.commit('Initial commit');
  await gitInstance.push('origin', 'main');
};

module.exports = pushRepo;