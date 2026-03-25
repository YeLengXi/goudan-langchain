const fs = require('fs');

function searchLogs(logs, keyword, startTime, endTime, level) {
  return logs.filter((log) => {
    const logTime = new Date(log.data[0]).getTime();
    const isKeywordMatch = log.data.join(' ').toLowerCase().includes(keyword.toLowerCase());
    const isTimeMatch = logTime >= startTime && logTime <= endTime;
    const isLevelMatch = !level || log.data[1].toLowerCase() === level.toLowerCase();
    return isKeywordMatch && isTimeMatch && isLevelMatch;
  });
}

module.exports = {
  searchLogs,
}