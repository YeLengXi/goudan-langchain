const fs = require('fs');
const parser = require('../log-analyzer.cjs');
const logParser = require('../log-analyzer/日志解析器.js');

const readErrorLog = (filePath) => {
  const errorLog = fs.readFileSync(filePath, 'utf8');
  const parsedLogs = parser.parseErrorLog(errorLog);
  const errorCount = parsedLogs.length;
  const groupedErrors = parsedLogs.reduce((acc, log) => {
    if (!acc[log.level]) {
      acc[log.level] = [];
    }
    acc[log.level].push(log.message);
    return acc;
  }, {});
  const mostFrequentError = Object.entries(groupedErrors).reduce((acc, [level, messages]) => {
    return messages.length > acc.messages.length ? { level, messages } : acc;
  }, { level: 'ERROR', messages: [] }).messages;
  return {
    errorCount,
    groupedErrors,
    mostFrequentError
  };
};

module.exports = {
  readErrorLog
}