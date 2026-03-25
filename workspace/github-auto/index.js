// 主程序
//
// 该程序自动化 GitHub 仓库的创建、初始化和推送流程。
//
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN';

program
  .version('1.0.0')
  .command('create <repoName> [isPrivate]')
  .description('创建 GitHub 仓库')
  .option('--public', '创建公开仓库', false)
  .option('--private', '创建私有仓库', false)
  .action(async (repoName, isPrivate) => {
    try {
      const { data } = await axios.post(`${GITHUB_API}/user/repos`, {
        name: repoName,
        private: isPrivate || program.private,
      }, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      console.log(`仓库创建成功: ${data.html_url}`);
      // 初始化 README, .gitignore 和 LICENSE
      fs.copyFileSync(
        path.join(__dirname, '../templates/README.md'),
        path.join(data.clone_url, 'README.md')
      );
      fs.copyFileSync(
        path.join(__dirname, '../templates/.gitignore'),
        path.join(data.clone_url, '.gitignore')
      );
      fs.copyFileSync(
        path.join(__dirname, '../templates/LICENSE'),
        path.join(data.clone_url, 'LICENSE')
      );
    } catch (error) {
      console.error('创建仓库失败:', error);
    }
  })
  .command('init [template]')
  .description('初始化本地项目')
  .action(async (template) => {
    try {
      // 初始化 git
      exec_command('git init');
      // 创建项目结构
      fs.mkdirSync(path.join(__dirname, 'src'), { recursive: true });
      // 添加初始文件
      fs.writeFileSync(
        path.join(__dirname, 'src/index.js'),
        'console.log("Hello, world!");
      ];
      // 第一次提交
      exec_command('git add .');
      exec_command('git commit -m "Initial commit"');
    } catch (error) {
      console.error('初始化本地项目失败:', error);
    }
  })
  .command('push')
  .description('推送到 GitHub')
  .action(() => {
    try {
      // 添加 remote
      exec_command('git remote add origin git@github.com:USERNAME/REPO_NAME.git');
      // 推送到 main 分支
      exec_command('git push -u origin main');
      // 设置默认分支
      exec_command('git checkout -b main');
    } catch (error) {
      console.error('推送到 GitHub 失败:', error);
    }
  })

program.parse(process.argv);
