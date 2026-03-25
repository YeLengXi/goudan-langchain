// 主程序
const { createRepository, initializeLocal, pushToGitHub, readTemplate, writeTemplate, getTemplates } = require('./utils');

module.exports = {
  create: (args) => {
    createRepository(args);
  },
  init: (args) => {
    initializeLocal(args);
  },
  push: () => {
    pushToGitHub();
  }
};