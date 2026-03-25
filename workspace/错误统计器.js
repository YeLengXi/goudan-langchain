const fs = require('fs');
const path = require('path');
const readline = require('readline');

function countErrors(parsedData) {
  const errorTypes = {};

  parsedData.forEach(entry => {
    if (entry.level === 'ERROR') {
      const messageType = entry.message.split(':')[0];
      errorTypes[messageType] = (errorTypes[messageType] || 0) + 1;
    }
  });

  return errorTypes;
}

function getMostFrequentError(errorTypes) {
  let mostFrequentError = null;
  let maxCount = 0;

  for (const [type, count] of Object.entries(errorTypes)) {
    if (count > maxCount) {
      mostFrequentError = type;
      maxCount = count;
    }
  }

  return mostFrequentError;
}

module.exports = {
  countErrors,
  getMostFrequentError
}