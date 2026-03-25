const fs = require('fs');
const path = require('path');
const { parseLog, countErrors, searchLogs, generateReport, exportLogs } = require('./log-analyzer.cjs');

// 读取日志文件
function readLog(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const filePath = args[0];
  const command = args[1];

  if (!filePath) {
    console.error('请指定日志文件路径。');
    return;
  }

  const logContent = readLog(filePath);

  switch (command) {
    case '--error':
      const errors = countErrors(logContent);
      console.log(JSON.stringify(errors, null, 2));
      break;
    case '--search':
      const keyword = args[2];
      const startTime = args[3];
      const endTime = args[4];
      const level = args[5];
      const result = searchLogs(logContent, keyword, startTime, endTime, level);
      console.log(result);
      break;
    case '--export':
      const format = args[2];
      exportLogs(logContent, format);
      break;
    default:
      console.error('未知命令。');
  }
}

main();