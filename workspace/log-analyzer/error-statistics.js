const fs = require('fs');

function countErrors(logs) {
  const errorTypes = {};
  logs.forEach((log) => {
    if (log.format === 'error') {
      const errorType = log.data[1];
      errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
    }
  });
  return errorTypes;
}

module.exports = {
  countErrors,
}