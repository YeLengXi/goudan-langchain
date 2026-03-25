const axios = require('axios');const fs = require('fs');const path = require('path');const { exec } = require('child_process');const githubToken = 'YOUR_GITHUB_TOKEN';const githubApiUrl = 'https://api.github.com';const templatesDir = path.join(__dirname, '../templates');

function createRepo(username, repoName, isPublic, description) {
  const repoUrl = `${githubApiUrl}/users/${username}/repos`;  const data = {
    name: repoName,
    private: !isPublic
  }
  if (description) {
    data.description = description
  }
  return axios.post(repoUrl, data, {
    headers: {
      'Authorization': `token ${githubToken}`
    }
  });
}

function initRepo(repoPath) {
  if (!fs.existsSync(repoPath)) {
    fs.mkdirSync(repoPath);
  }
  fs.writeFileSync(path.join(repoPath, 'README.md'), readFileSync(path.join(templatesDir, 'README.md')));
  fs.writeFileSync(path.join(repoPath, '.gitignore'), readFileSync(path.join(templatesDir, '.gitignore')));
  fs.writeFileSync(path.join(repoPath, 'LICENSE'), readFileSync(path.join(templatesDir, 'LICENSE')));
  exec(`git -C ${repoPath} init`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    }
    console.log(stdout);
  });
}

function pushRepo(repoPath) {
  exec(`git -C ${repoPath} add .`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    }
    console.log(stdout);
  });
  exec(`git -C ${repoPath} commit -m 'Initial commit'`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    }
    console.log(stdout);
  });
  exec(`git -C ${repoPath} remote add origin git@github.com:USERNAME/REPO.git`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    }
    console.log(stdout);
  });
  exec(`git -C ${repoPath} push -u origin main`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    }
    console.log(stdout);
  });
}

function readFileSync(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

module.exports = {
  createRepo,
  initRepo,
  pushRepo
};