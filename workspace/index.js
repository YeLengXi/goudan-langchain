const fs = require('fs');
const path = require('path');
const { parseLog, countErrors, searchLogs, generateReport } = require('./log-analyzer.cjs');

// 读取日志文件
function readLogFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// 主函数
function main() {
  const logFilePath = process.argv[2];
  const options = process.argv.slice(3);

  if (!logFilePath) {
    console.error('请指定日志文件路径。');
    return;
  }

  const logContent = readLogFile(logFilePath);

  // 处理选项
  options.forEach(option => {
    switch (option) {
      case '--error':
        countErrors(logContent);
        break;
      case '--search':
        const keyword = options.find(o => o.startsWith('--search=')).split('=')[1];
        searchLogs(logContent, keyword);
        break;
      case '--export':
        const format = options.find(o => o.startsWith('--export=')).split('=')[1];
        generateReport(logContent, format);
        break;
      default:
        console.error(`未知选项：${option}`);
    }
  });
}

main();