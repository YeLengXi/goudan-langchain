const fs = require('fs');
const path = require('path');
const logAnalyzer = require('./log-analyzer');
const errorCounter = require('./error-counter');

const searchLogs = {
  search: (filePath, query, startTime, endTime, level) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsedLogs = logAnalyzer.parseLog(filePath);
    const filteredLogs = parsedLogs.filter(log => {
      const matches = log.message.includes(query) && log.timestamp >= startTime && log.timestamp <= endTime && (level ? log.level === level : true);
      return matches;
    });
    return filteredLogs;
  }
};

module.exports = searchLogs;