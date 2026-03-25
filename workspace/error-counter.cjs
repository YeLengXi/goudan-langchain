const fs = require('fs');
const path = require('path');

const logAnalyzer = require('./log-analyzer');

const errorCounter = {
  countErrors: (parsedLogs) => {
    const errorTypes = {};
    parsedLogs.forEach(log => {
      if (log.level === 'ERROR') {
        const errorType = log.message;
        errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
      }
    });
    return errorTypes;
  }
};

module.exports = errorCounter;