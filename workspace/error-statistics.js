const fs = require('fs');
const path = require('path');

const logParser = require('./log-parser');

// 错误统计器
const errorStatistics = {
  countErrors: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      if (log.errorType) {
        errorTypes[log.errorType] = (errorTypes[log.errorType] || 0) + 1;
      }
    });
    return errorTypes;
  },
  groupErrorsByType: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      if (log.errorType) {
        if (!errorTypes[log.errorType]) {
          errorTypes[log.errorType] = [];
        }
        errorTypes[log.errorType].push(log);
      }
    });
    return errorTypes;
  },
  getMostFrequentError: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      if (log.errorType) {
        errorTypes[log.errorType] = (errorTypes[log.errorType] || 0) + 1;
      }
    });
    let mostFrequentError = null;
    let maxCount = 0;
    for (const errorType in errorTypes) {
      if (errorTypes[errorType] > maxCount) {
        mostFrequentError = errorType;
        maxCount = errorTypes[errorType];
      }
    }
    return mostFrequentError;
  }
};

module.exports = errorStatistics;