const fs = require('fs');
const path = require('path');

// 日志解析器
function parseLog(logContent) {
  const lines = logContent.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    if (line.includes('[') && line.includes(']')) {
      const timestamp = line.split(' ')[0];
      const level = line.split(' ')[1];
      const message = line.split(' ')[2];
      parsedLogs.push({ timestamp, level, message });
    }
  });

  return parsedLogs;
}

// 错误统计器
function countErrors(logContent) {
  const errors = [];
  const lines = logContent.split('
');

  lines.forEach(line => {
    if (line.includes('Error')) {
      errors.push(line);
    }
  });

  return errors;
}

// 搜索引擎
function searchLogs(logContent, keyword, startTime, endTime, level) {
  const results = [];
  const lines = logContent.split('
');

  lines.forEach(line => {
    if (line.includes(keyword) && (startTime ? line.includes(startTime) : true) && (endTime ? line.includes(endTime) : true) && (level ? line.includes(level) : true)) {
      results.push(line);
    }
  });

  return results;
}

// 报告生成器
function generateReport(logContent) {
  const errors = countErrors(logContent);
  const report = {
    totalErrors: errors.length,
    errorTypes: errors.map(error => error.split('Error')[1].split(':')[0]).filter((value, index, self) => self.indexOf(value) === index)
  }

  return report;
}

// 导出功能
function exportLogs(logContent, format) {
  if (format === 'json') {
    const parsedLogs = parseLog(logContent);
    const report = generateReport(logContent);
    const jsonContent = JSON.stringify({ parsedLogs, report }, null, 2);
    console.log(jsonContent);
  }
  if (format === 'csv') {
    const parsedLogs = parseLog(logContent);
    const csvContent = parsedLogs.map(log => `${log.timestamp},${log.level},${log.message}`).join('
');
    console.log(csvContent);
  }
}

// 主函数
function main() {
  const filePath = process.argv[2];
  const options = process.argv.slice(3);

  const logContent = fs.readFileSync(filePath, 'utf8');

  // 根据选项执行相应功能
  if (options.includes('--error')) {
    const errors = countErrors(logContent);
    console.log(errors);
  }
  if (options.includes('--search')) {
    const keyword = options.find(option => option.startsWith('--search='))?.split('=')[1];
    const startTime = options.find(option => option.startsWith('--start='))?.split('=')[1];
    const endTime = options.find(option => option.startsWith('--end='))?.split('=')[1];
    const level = options.find(option => option.startsWith('--level='))?.split('=')[1];
    const searchResults = searchLogs(logContent, keyword, startTime, endTime, level);
    console.log(searchResults);
  }
  if (options.includes('--export')) {
    const format = options.find(option => option.startsWith('--export='))?.split('=')[1];
    exportLogs(logContent, format);
  }
}

main();