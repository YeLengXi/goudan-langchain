const read_file = require('fs').readFileSync;

const countErrors = (parsedLogs) => {
  const errorTypes = parsedLogs.reduce((acc, log) => {
    if (log.level === 'ERROR') {
      acc[log.message] = (acc[log.message] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedErrors = Object.entries(errorTypes).sort((a, b) => b[1] - a[1]);

  return sortedErrors;
};

module.exports = {
  countErrors
}