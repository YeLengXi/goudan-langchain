const fs = require('fs');
const parser = require('../log-analyzer.cjs');

const readAppLog = (filePath) => {
  const appLog = fs.readFileSync(filePath, 'utf8');
  const parsedLogs = parser.parseAppLog(appLog);
  return parsedLogs;
};

const readApacheLog = (filePath) => {
  const apacheLog = fs.readFileSync(filePath, 'utf8');
  const parsedLogs = parser.parseApacheLog(apacheLog);
  return parsedLogs;
};

const searchLogs = (logs, keyword, timeRange, level) => {
  return logs.filter(log => {
    return log.message.includes(keyword) &&
           log.timestamp >= timeRange[0] &&
           log.timestamp <= timeRange[1] &&
           (!level || log.level === level);
  });
};

module.exports = {
  readAppLog,
  readApacheLog,
  searchLogs
}