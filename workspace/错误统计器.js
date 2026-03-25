const fs = require('fs');

module.exports = {
  countErrors: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      if (log.level === 'ERROR') {
        const errorType = log.message.match(/Error: ([^\n]+)/)[1];
        errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
      }
    });
    return errorTypes;
  },

  getMostFrequentError: (errorTypes) => {
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
}