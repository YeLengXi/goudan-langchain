const parseAppLog = require('./log-analyzer').parseAppLog;

const countErrors = (logs) => {
  const errorTypes = {};

  logs.forEach(log => {
    if (log.level === 'ERROR') {
      const errorType = log.message;
      errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
    }
  });

  return errorTypes;
};

module.exports = {
  countErrors
}