const { parseLog } = require('./log-analyzer.cjs');
const { countErrors } = require('./错误统计器.js');

const searchLogs = (logPath, keywords, timeRange, level) => {
  const logData = parseLog(logPath);
  const filteredLogs = logData.filter(entry => {
    if (keywords && !entry.message.includes(keywords)) {
      return false;
    }
    if (timeRange && entry.timestamp < timeRange.start || entry.timestamp > timeRange.end) {
      return false;
    }
    if (level && entry.level !== level) {
      return false;
    }
    return true;
  });

  return filteredLogs;
};

module.exports = {
  searchLogs
}