const { exec_command } = require('./utils');

module.exports = {
  create: async (projectName, isPublic, description) => {
    // 实现创建仓库的逻辑
  },
  init: async (template) => {
    // 实现初始化项目的逻辑
  },
  push: async () => {
    // 实现推送到 GitHub 的逻辑
  }
};