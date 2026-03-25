// 主程序
const { createRepository, initializeLocal, pushToGitHub, handleTemplates } = require('./utils');

module.exports = {
  create: createRepository,
  init: initializeLocal,
  push: pushToGitHub
};