const { exec_command, read_file, write_file, list_directory } = require('./utils');

const createRepo = async (owner, name, isPublic, description) => {
  // GitHub API 调用代码
};

const initRepo = async (template) => {
  // 初始化本地仓库代码
};

const pushRepo = async () => {
  // 推送到 GitHub 代码
};

module.exports = {
  createRepo,
  initRepo,
  pushRepo
};