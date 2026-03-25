// 主程序
const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');

// GitHub API URL
const GITHUB_API_URL = 'https://api.github.com';

// 读取配置文件
const config = JSON.parse(fs.readFileSync('E:/goudan-langchain/workspace/github-auto/config.json', 'utf8'));

// GitHub Personal Access Token
const token = config.github_token;

// 模板文件路径
const templatesDir = 'E:/goudan-langchain/workspace/github-auto/templates';

// 创建仓库
function createRepository(repoName, isPublic, description) {
  const options = {
    hostname: 'api.github.com',
    path: `/user/repos`,
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      name: repoName,
      private: !isPublic
    })
  }

  const req = https.request(options, (res) => {
    if (res.statusCode === 201) {
      console.log(`Repository ${repoName} created successfully`);
      initializeRepository(repoName, isPublic, description);
    } else {
      console.error(`Failed to create repository: ${res.statusCode} ${res.statusMessage}`);
    }
  });

  req.on('error', (e) => {
    console.error(`Request Error: ${e.message}`);
  });

  req.write(body);
  req.end();
}

// 初始化仓库
function initializeRepository(repoName, isPublic, description) {
  // 初始化 git
  exec(`git init E:/goudan-langchain/workspace/${repoName}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Git init Error: ${stderr}`);
      return;
    }
    console.log('Git initialized successfully');

    // 创建项目结构
    const projectDir = `E:/goudan-langchain/workspace/${repoName}`;
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(`${projectDir}/README.md`, fs.readFileSync(`${templatesDir}/README.md`, 'utf8').replace(/{{repoName}}/g, repoName).replace(/{{description}}/g, description || ''));
    fs.writeFileSync(`${projectDir}/.gitignore`, fs.readFileSync(`${templatesDir}/.gitignore`, 'utf8').replace(/{{repoName}}/g, repoName));
    fs.writeFileSync(`${projectDir}/LICENSE`, fs.readFileSync(`${templatesDir}/LICENSE`, 'utf8').replace(/{{repoName}}/g, repoName));

    // 第一次提交
    exec(`git -C ${projectDir} add .`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Git add Error: ${stderr}`);
        return;
      }
      exec(`git -C ${projectDir} commit -m 'Initial commit'`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Git commit Error: ${stderr}`);
          return;
        }
        console.log('Initial commit done');
      });
    });
  });
}

// CLI 命令处理
const args = process.argv.slice(2);
if (args[0] === 'create') {
  const repoName = args[1];
  const isPublic = args[2] === '--public';
  const description = args.slice(3).join(' ');
  createRepository(repoName, isPublic, description);
} else if (args[0] === 'init') {
  const template = args[1];
  initializeRepository(template);
} else if (args[0] === 'push') {
  // 添加 remote
  exec('git remote add origin https://github.com/username/repository.git', (err, stdout, stderr) => {
    if (err) {
      console.error(`Git remote add Error: ${stderr}`);
      return;
    }
    console.log('Remote added successfully');

    // 推送到 main 分支
    exec('git push -u origin main', (err, stdout, stderr) => {
      if (err) {
        console.error(`Git push Error: ${stderr}`);
        return;
      }
      console.log('Pushed to main branch successfully');
    });
  });
} else {
  console.log('Unknown command');
}
