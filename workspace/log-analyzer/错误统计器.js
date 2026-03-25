const { parseLog } = require('./log-analyzer.cjs');

const countErrors = (logData) => {
  const errorTypes = logData.reduce((acc, entry) => {
    if (entry.level === 'ERROR') {
      acc[entry.stack] = (acc[entry.stack] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedErrors = Object.entries(errorTypes).sort((a, b) => b[1] - a[1]);

  return sortedErrors.map(error => {
    return {
      errorType: error[0],
      count: error[1]
    }
  });
};

module.exports = {
  countErrors
}