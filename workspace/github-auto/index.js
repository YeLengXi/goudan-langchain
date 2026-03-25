const fs = require('fs');
const https = require('https');
const path = require('path');
const { exec } = require('child_process');

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';

// 读取命令行参数
const args = process.argv.slice(2);
const command = args[0];
const project = args[1] || ''; 
const options = args.slice(2);

// 创建 GitHub 仓库
function createRepo(project, isPublic) {
  const repoUrl = `${GITHUB_API_URL}/user/repos`; 
  const data = {
    name: project,
    description: project,
    private: !isPublic
  };
  const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  };
  return new Promise((resolve, reject) => {
    https.post(repoUrl, { json: true, headers: headers, body: data }, (err, res, body) => {
      if (err) {
        reject(err);
      } else if (res.statusCode === 201) {
        resolve(body);
      } else {
        reject(new Error(body.message || 'Failed to create repository'));n      }
    });
  });
}

// 本地初始化
function initLocal(project) {
  exec(`git init ${project}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Initialized local git repository.');
    createFiles(project);
  });
}

// 创建文件
function createFiles(project) {
  const templateDir = path.join(__dirname, '../templates');
  const templates = {
    'README': fs.readFileSync(path.join(templateDir, 'README.md'), 'utf8'),
    '.gitignore': fs.readFileSync(path.join(templateDir, '.gitignore'), 'utf8'),
    'LICENSE': fs.readFileSync(path.join(templateDir, 'LICENSE'), 'utf8')
  };
  Object.entries(templates).forEach(([filename, content]) => {
    fs.writeFileSync(path.join(project, filename), content);
  });
  commitFiles(project);
}

// 提交文件
function commitFiles(project) {
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
      pushToGitHub(project);
    });
  });
}

// 推送到 GitHub
function pushToGitHub(project) {
  exec(`git remote add origin https://${GITHUB_TOKEN}@github.com/${project}.git`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    exec(`git push -u origin main`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Pushed to GitHub.');
    });
  });
}

// 处理命令
switch (command) {
  case 'create':
    const isPublic = options.includes('--public');
    createRepo(project, isPublic).then(repo => {
      console.log(`Repository created: ${repo.html_url}`);
    }).catch(err => {
      console.error(err);
    });
    break;
  case 'init':
    initLocal(project);
    break;
  case 'push':
    pushToGitHub(project);
    break;
  default:
    console.log('Unknown command');
}