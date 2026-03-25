// 主程序
const program = require('commander');

// GitHub API 函数
async function createRepo(username, repoName, isPublic) {
  // 实现创建仓库的逻辑
}

// CLI 命令
program
  .command('create <username> <repoName> [isPublic]')
  .description('创建 GitHub 仓库')
  .option('--public', '创建公开仓库')
  .action(async (username, repoName, isPublic) => {
    await createRepo(username, repoName, isPublic);
  })

// 导出程序
module.exports = program;