const fs = require('fs');
const path = require('path');

// 日志解析器
function parseLog(logContent) {
  const lines = logContent.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    if (line.includes('INFO') || line.includes('ERROR') || line.includes('DEBUG') || line.includes('WARN')) {
      const timestamp = line.match(/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}/);
      const level = line.match(/INFO|ERROR|DEBUG|WARN/);
      const message = line.match(/(?:INFO|ERROR|DEBUG|WARN).*?(?=(INFO|ERROR|DEBUG|WARN|$))/);

      parsedLogs.push({
        timestamp: timestamp ? timestamp[0] : '',
        level: level ? level[0] : '',
        message: message ? message[0].replace(/INFO|ERROR|DEBUG|WARN/, '') : '',
      });
    }
  });

  return parsedLogs;
}

// 错误统计器
function countErrors(logContent) {
  const logs = parseLog(logContent);
  const errorTypes = {};

  logs.forEach(log => {
    if (log.level === 'ERROR') {
      const errorType = log.message.match(/Error: (.*)/);
      if (errorType) {
        const type = errorType[1];
        errorTypes[type] = (errorTypes[type] || 0) + 1;
      }
    }
  });

  return errorTypes;
}

// 搜索引擎
function searchLogs(logContent, keyword, startTime, endTime, level) {
  const logs = parseLog(logContent);
  const filteredLogs = logs.filter(log => {
    return log.message.includes(keyword) && log.timestamp >= startTime && log.timestamp <= endTime && log.level === level;
  });

  return filteredLogs;
}

// 报告生成器
function generateReport(logContent, errors) {
  const report = {
    totalErrors: Object.keys(errors).length,
    errorTypes: errors
  }

  fs.writeFileSync('error-report.json', JSON.stringify(report, null, 2));
}

// 导出功能
function exportLogs(logContent, format) {
  const logs = parseLog(logContent);

  if (format === 'json') {
    fs.writeFileSync('exported-logs.json', JSON.stringify(logs, null, 2));
  } else if (format === 'csv') {
    const csvContent = logs.map(log => [log.timestamp, log.level, log.message].join(',')).join('
');
    fs.writeFileSync('exported-logs.csv', csvContent);
  }
}

// 主函数
function main() {
  const logFilePath = process.argv[2];
  const options = process.argv.slice(3);

  const logContent = fs.readFileSync(logFilePath, 'utf8');

  if (options.includes('--error')) {
    const errors = countErrors(logContent);
    generateReport(logContent, errors);
  }

  if (options.includes('--search')) {
    const keyword = options.find(option => option.startsWith('--search='))?.split('=')[1];
    const startTime = options.find(option => option.startsWith('--start='))?.split('=')[1];
    const endTime = options.find(option => option.startsWith('--end='))?.split('=')[1];
    const level = options.find(option => option.startsWith('--level='))?.split('=')[1];
    const filteredLogs = searchLogs(logContent, keyword, startTime, endTime, level);
    console.log(filteredLogs);
  }

  if (options.includes('--export')) {
    const format = options.find(option => option.startsWith('--export='))?.split('=')[1];
    exportLogs(logContent, format);
  }
}

main();