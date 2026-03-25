const analyzeLog = require('./log-analyzer');
const fs = require('fs');
const path = require('path');

const ERROR_TYPES = {
  'INFO': 0,
  'ERROR': 1,
  'WARN': 2
};

const countErrors = (logData) => {
  const errorCounts = {
    total: 0
  };

  logData.forEach(entry => {
    if (entry.type === 'ERROR') {
      const level = entry.line.match(/(INFO|ERROR|WARN)/)[1];
      errorCounts[level] = (errorCounts[level] || 0) + 1;
      errorCounts.total += 1;
    }
  });

  return errorCounts;
};

module.exports = { countErrors };