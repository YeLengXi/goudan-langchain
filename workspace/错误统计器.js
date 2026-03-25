const parseAppLog = require('./log-analyzer').parseAppLog;
const parseApacheLog = require('./log-analyzer').parseApacheLog;
const parseErrorLog = require('./log-analyzer').parseErrorLog;

const errorStats = (logs) => {
  const errorTypes = {};

  logs.forEach(log => {
    if (log.level === 'ERROR') {
      const errorType = log.message;
      errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
    }
  });

  return errorTypes;
};

const findMostFrequentError = (errorStats) => {
  let mostFrequentError = '';
  let highestCount = 0;

  for (const errorType in errorStats) {
    if (errorStats[errorType] > highestCount) {
      highestCount = errorStats[errorType];
      mostFrequentError = errorType;
    }
  }

  return mostFrequentError;
};

module.exports = {
  errorStats,
  findMostFrequentError
}