// 主程序
# GitHub 自动化工具

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';

// 创建 GitHub 仓库
async function createRepository(repoName, isPublic, description) {
  const response = await axios.post(`${GITHUB_API_URL}/user/repos`, {
    name: repoName,
    private: !isPublic
  }, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });

  return response.data; 
}

// 初始化本地仓库
async function initLocalRepository(repoName) {
  exec(`git init ${repoName}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Local repository initialized.');
  });

  // 创建项目结构
  const projectStructure = {
    'index.js': '',
    'README.md': '',
    '.gitignore': '',
    'LICENSE': ''
  };

  Object.keys(projectStructure).forEach(file => {
    fs.writeFileSync(
      path.join(repoName, file),
      projectStructure[file]
    );
  });

  // 初始化 git
  exec(`git add .`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Initial files added to git.');
  });

  exec(`git commit -m 'Initial commit'`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Initial commit done.');
  });
}

// 推送到 GitHub
async function pushToGitHub(repoName) {
  exec(`git remote add origin https://${GITHUB_TOKEN}@github.com/${repoName}.git`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Remote origin added.');
  });

  exec(`git push -u origin main`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Pushed to GitHub.');
  });
}

module.exports = {
  createRepository,
  initLocalRepository,
  pushToGitHub
};