# index.js

// 读取命令行参数
const yargs = require('yargs/yargs')(process.argv);
const { hideBin } = require('yargs/helpers');
const args = yargs.hideBin(process.argv).argv;

// 读取 GitHub Personal Access Token
const token = require('fs').readFileSync('./.github-token').toString().trim();

// GitHub API
const axios = require('axios');
const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${token}`
  }
});

// 模板
const templates = {
  'README': 'README.md',
  '.gitignore': '.gitignore',
  'LICENSE': 'LICENSE'
};

// 创建仓库
async function createRepo(repoName, isPublic, description) {
  try {
    const response = await api.post('/user/repos', {
      name: repoName,
      private: !isPublic
    });
    return response.data;
  } catch (error) {
    console.error('Error creating repository:', error);
    process.exit(1);
  }
}

// 初始化本地仓库
async function initLocalRepo(repoName) {
  const repoPath = `./${repoName}`;
  exec_command(`mkdir -p ${repoPath}`);
  exec_command(`cd ${repoPath}`);
  exec_command('git init');
  Object.entries(templates).forEach(([key, value]) => {
    const templatePath = `../templates/${value}`;
    read_file(templatePath).then(content => {
      write_file(`${repoPath}/${value}`, content);
    });
  });
}

// 推送到 GitHub
async function pushToGitHub(repoName) {
  const repoPath = `./${repoName}`;
  exec_command(`cd ${repoPath}`);
  exec_command('git add .');
  exec_command('git commit -m "Initial commit"');
  exec_command(`git remote add origin https://github.com/${repoName}.git`);
  exec_command(`git push -u origin main`);
}

// 处理命令
switch (args._[0]) {
  case 'create':
    if (!args.public && !args.private) {
      console.error('Please specify --public or --private');
      process.exit(1);
    }
    const repoName = args._[1];
    const isPublic = args.public;
    const description = args.description || '';
    const repo = await createRepo(repoName, isPublic, description);
    console.log('Repository created:', repo.html_url);
    initLocalRepo(repoName);
    break;
  case 'init':
    const template = args.template;
    initLocalRepo(template);
    break;
  case 'push':
    const repoName = args._[1];
    pushToGitHub(repoName);
    break;
  default:
    console.log('Unknown command');
}
