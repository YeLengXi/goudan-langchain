const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_ACCESS_TOKEN = 'YOUR_GITHUB_ACCESS_TOKEN';

const createRepository = async (name, isPublic, description) => {
  const options = {
    hostname: 'api.github.com',
    path: `/user/repos`,
    method: 'POST',
    headers: {
      'Authorization': `token ${GITHUB_ACCESS_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      name: name,
      private: !isPublic
    })
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(options.body);
    req.end();
  });
};

const initGit = async () => {
  await exec('git init');
  await exec('git add .');
  await exec('git commit -m "Initial commit"');
};

const pushToGitHub = async () => {
  await exec('git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git');
  await exec('git push -u origin main');
};

module.exports = {
  createRepository,
  initGit,
  pushToGitHub
};