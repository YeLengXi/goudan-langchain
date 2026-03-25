const fs = require('fs');
const parser = require('../log-analyzer.cjs');
const errorStats = require('../log-analyzer/错误统计器.js');
const logParser = require('../log-analyzer/日志解析器.js');

const exportToJson = (logs) => {
  const jsonLogs = JSON.stringify(logs, null, 2);
  fs.writeFileSync('exported_logs.json', jsonLogs, 'utf8');
};

const exportToCsv = (logs) => {
  const csvLogs = logs.map(log => {
    return [log.timestamp, log.level, log.message].join(',');
  }).join('
');
  fs.writeFileSync('exported_logs.csv', csvLogs, 'utf8');
};

const generateReport = (logs) => {
  const errorCount = logs.length;
  const groupedErrors = logs.reduce((acc, log) => {
    if (!acc[log.level]) {
      acc[log.level] = [];
    }
    acc[log.level].push(log.message);
    return acc;
  }, {});
  const mostFrequentError = Object.entries(groupedErrors).reduce((acc, [level, messages]) => {
    return messages.length > acc.messages.length ? { level, messages } : acc;
  }, { level: 'ERROR', messages: [] }).messages;
  const report = `Error Count: ${errorCount}
Grouped Errors:
${JSON.stringify(groupedErrors, null, 2)}
Most Frequent Error: ${mostFrequentError.join(', ')}`;
  fs.writeFileSync('report.txt', report, 'utf8');
};

module.exports = {
  exportToJson,
  exportToCsv,
  generateReport
}