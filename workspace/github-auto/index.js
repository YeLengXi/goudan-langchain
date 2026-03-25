// 主程序

const program = require('commander');

const createRepo = require('./createRepo');
const initRepo = require('./initRepo');
const pushRepo = require('./pushRepo');

program
  .version('1.0.0')
  .command('create <name> [description]', '创建一个新的 GitHub 仓库')
    .option('--public', '创建公开仓库')
    .option('--private', '创建私有仓库')
    .action(createRepo);

program
  .command('init --template <template>', '初始化本地仓库')
    .action(initRepo);

program
  .command('push', '将本地仓库推送到 GitHub')
    .action(pushRepo);

program.parse(process.argv);