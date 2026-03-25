const axios = require('axios');

const createRepository = async (name, isPublic, description) => {
  const token = 'YOUR_GITHUB_TOKEN';
  const response = await axios.post('https://api.github.com/user/repos', {
    name,
    private: !isPublic
  }, {
    headers: {
      Authorization: `token ${token}`
    }
  });

  return response.data;
};

const initializeGit = async (repository) => {
  // 初始化 git
  // 创建项目结构
  // 添加初始文件
  // 第一次提交

  // 推送到 GitHub
  // 添加 remote
  // 推送到 main 分支
  // 设置默认分支

  return repository;
};

module.exports = {
  createRepository,
  initializeGit
};