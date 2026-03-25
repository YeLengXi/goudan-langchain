const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const githubToken = 'YOUR_GITHUB_TOKEN';
const githubApiUrl = 'https://api.github.com';

const createRepo = async (name, isPublic, description) => {
  const repoUrl = `${githubApiUrl}/user/repos`;
  const response = await axios.post(repoUrl, {
    name,
    description,
    private: !isPublic
  }, {
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  return response.data;
};

const initRepo = async (repo) => {
  const { name, html_url } = repo;
  exec(`git init ${path.join(__dirname, name)}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Git initialized.');
    fs.copyFileSync(path.join(__dirname, 'templates', '.gitignore'), path.join(__dirname, name, '.gitignore'));
    fs.copyFileSync(path.join(__dirname, 'templates', 'LICENSE'), path.join(__dirname, name, 'LICENSE'));
    fs.copyFileSync(path.join(__dirname, 'templates', 'README.md'), path.join(__dirname, name, 'README.md'));
    exec(`git add .`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      exec(`git commit -m 'Initial commit'`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Initial commit done.');
        exec(`git remote add origin ${html_url}`, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Remote added.');
          exec(`git push -u origin main`, (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Pushed to GitHub.');
          });
        });
      });
    });
  });
};

module.exports = {
  createRepo,
  initRepo
};