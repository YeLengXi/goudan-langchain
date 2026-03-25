// 主程序
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const githubApiUrl = 'https://api.github.com';
const token = 'YOUR_GITHUB_TOKEN';

// 读取命令行参数
const args = process.argv.slice(2);

// 创建 GitHub 仓库
async function createRepo(repoName, isPublic, description) {
  const config = {
    url: `${githubApiUrl}/user/repos",
    method: 'post',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    },
    data: {
      name: repoName,
      private: !isPublic,
      description
    }
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('创建仓库失败:', error);
    process.exit(1);
  }
}

// 本地初始化
function init(repoName) {
  const projectPath = path.join(__dirname, repoName);
  fs.mkdirSync(projectPath, { recursive: true });
  fs.writeFileSync(path.join(projectPath, 'README.md'), ''al
