// 主程序
const { createRepository, initializeLocal, pushToGitHub, createTemplateSystem } = require('./utils');

const program = require('commander');

program
  .version('1.0.0')
  .command('create <name> [description]', '创建 GitHub 仓库')
  .option('--public', '创建公开仓库', false)
  .option('--private', '创建私有仓库', false)
  .action((name, description, options) => {
    if (options.private && options.public) {
      console.error('只能选择创建公开或私有仓库');
      return;
    }

    createRepository(name, options.public);
  })
  .command('init [template]', '初始化本地项目')
  .action((template) => {
    initializeLocal(template);
  })
  .command('push', '推送到 GitHub')
  .action(() => {
    pushToGitHub();
  })

program.parse(process.argv);