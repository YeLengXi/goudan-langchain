const fs = require('fs');
const path = require('path');
const readline = require('readline');

const logAnalyzer = {
  parseLog: async (logFilePath, logType) => {
    const logLines = await fs.promises.readFile(logFilePath, 'utf-8').then(data => data.split('
'));
    let parsedLogs = [];

    switch (logType) {
      case 'app':
        parsedLogs = logLines.map(line => {
          const parts = line.split(' ');
          return {
            timestamp: parts[0],
            level: parts[1],
            message: parts.slice(2).join(' ') 
          }
        });
        break;
      case 'apache':
        parsedLogs = logLines.map(line => {
          const parts = line.split(' ');
          return {
            timestamp: parts[3],
            level: 'INFO',
            message: parts.slice(4).join(' ') 
          }
        });
        break;
      case 'error':
        parsedLogs = logLines.map(line => {
          const parts = line.split('
');
          return {
            timestamp: parts[0],
            level: 'ERROR',
            message: parts.slice(1).join('
') 
          }
        });
        break;
    }

    return parsedLogs;
  },

  countErrors: (parsedLogs) => {
    const errorTypes = parsedLogs.filter(log => log.level === 'ERROR').map(log => log.message);
    const errorCounts = errorTypes.reduce((acc, errorType) => {
      acc[errorType] = (acc[errorType] || 0) + 1;
      return acc;
    }, {});

    return errorCounts;
  },

  searchLogs: (parsedLogs, keyword, startTime, endTime, level) => {
    return parsedLogs.filter(log => {
      const isKeywordMatch = log.message.includes(keyword);
      const isTimeMatch = log.timestamp >= startTime && log.timestamp <= endTime;
      const isLevelMatch = level ? log.level === level : true;
      return isKeywordMatch && isTimeMatch && isLevelMatch;
    });  
  },

  exportLogs: (parsedLogs, format) => {
    let content = '';

    switch (format) {
      case 'json':
        content = JSON.stringify(parsedLogs, null, 2);
        break;
      case 'csv':
        content = parsedLogs.map(log => [log.timestamp, log.level, log.message].join(',')).join('
');
        break;
    }

    return content;
  }
};

module.exports = logAnalyzer;