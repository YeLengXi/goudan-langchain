const fs = require('fs');
const path = require('path');

const ERROR_TYPES = ['TypeError', 'SyntaxError', 'RangeError'];

const countErrors = (logs) => {
  const errorCounts = {
    TypeError: 0,
    SyntaxError: 0,
    RangeError: 0
  };

  logs.forEach(log => {
    ERROR_TYPES.forEach(errorType => {
      if (log.includes(errorType)) {
        errorCounts[errorType] += 1;
      }
    });
  });

  return errorCounts;
};

const getMostFrequentError = (errorCounts) => {
  let mostFrequentError = {
    name: '',
    count: 0
  };

  for (const errorType in errorCounts) {
    if (errorCounts[errorType] > mostFrequentError.count) {
      mostFrequentError = {
        name: errorType,
        count: errorCounts[errorType]
      };
    }
  }

  return mostFrequentError;
};

module.exports = {
  countErrors,
  getMostFrequentError
}