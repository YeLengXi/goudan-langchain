// 主程序
const program = require('commander');
const { createRepository, initializeLocal, pushToGitHub, readTemplate, listTemplates } = require('./lib');

program
  .command('create <name> [description]')
  .option('--public', '创建公开仓库')
  .option('--private', '创建私有仓库')
  .action(createRepository);

program
  .command('init [template]')
  .action(initializeLocal);

program
  .command('push')
  .action(pushToGitHub);

program.parse(process.argv);