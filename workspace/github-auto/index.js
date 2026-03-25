// 主程序

const { createRepository, initializeLocal, pushToGitHub, loadTemplates } = require('./utils');

const program = require('commander');

program
  .command('create <name> [isPrivate] [description]')
  .description('创建 GitHub 仓库')
  .option('--public', '创建公开仓库')
  .option('--private', '创建私有仓库')
  .action((name, isPrivate, description) => {
    createRepository(name, isPrivate, description);
  });

program
  .command('init [template]')
  .description('初始化本地项目')
  .action((template) => {
    initializeLocal(template);
  });

program
  .command('push')
  .description('推送到 GitHub')
  .action(() => {
    pushToGitHub();
  });

program.parse(process.argv);