const read_file = require('fs').readFileSync;

const searchLogs = (parsedLogs, keyword, startTime, endTime, level) => {
  return parsedLogs.filter(log => {
    const matchesKeyword = log.message.includes(keyword);
    const withinTimeRange = log.timestamp >= startTime && log.timestamp <= endTime;
    const matchesLevel = level ? log.level === level : true;

    return matchesKeyword && withinTimeRange && matchesLevel;
  });
};

module.exports = {
  searchLogs
}