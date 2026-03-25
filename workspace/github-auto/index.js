const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');
const path = require('path');

const githubToken = 'YOUR_GITHUB_TOKEN';
const githubApiUrl = 'https://api.github.com';

const createRepository = (name, isPublic, description) => {
  const options = {
    hostname: 'api.github.com',
    path: `/user/repos`,
    method: 'POST',
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    },
    json: true,
    body: {
      name,
      private: !isPublic
    }
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      if (res.statusCode === 201) {
        resolve(res.body);
      } else {
        reject(new Error('Failed to create repository'));
      }
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(JSON.stringify(options.body));
    req.end();
  });
};

const initRepository = (path) => {
  return new Promise((resolve, reject) => {
    exec(`git init ${path}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });};

const addFiles = (path) => {
  return new Promise((resolve, reject) => {
    exec(`cd ${path} && git add .`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });};

const commitAndPush = (path) => {
  return new Promise((resolve, reject) => {
    exec(`cd ${path} && git commit -m 'Initial commit' && git remote add origin https://github.com/YOUR_USERNAME/your-repo.git && git push -u origin main`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });};

module.exports = {
  createRepository,
  initRepository,
  addFiles,
  commitAndPush
}