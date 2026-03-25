const fs = require('fs');

module.exports = {
  searchLogs: (logs, keyword, startTime, endTime, level) => {
    return logs.filter(log => {
      const isKeywordMatch = log.message.includes(keyword);
      const isTimeInRange = new Date(log.timestamp) >= new Date(startTime) && new Date(log.timestamp) <= new Date(endTime);
      const isLevelMatch = log.level === level;
      return isKeywordMatch && isTimeInRange && isLevelMatch;
    });
  }
}