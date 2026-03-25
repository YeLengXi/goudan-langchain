const read_file = require('fs').readFile;
const write_file = require('fs').writeFile;
const parseLog = require('../日志解析器/index');
const util = require('util');
const readFile = util.promisify(read_file);
const writeFile = util.promisify(write_file);

const countErrors = async (logs) => {
  const errorTypes = {};
  logs.forEach(log => {
    if (log.level === 'ERROR') {
      errorTypes[log.message] = (errorTypes[log.message] || 0) + 1;
    }
  });
  return errorTypes;
};

const groupByType = (logs) => {
  const groupedLogs = {
    INFO: [],
    WARN: [],
    ERROR: []
  };
  logs.forEach(log => {
    groupedLogs[log.level].push(log);
  });
  return groupedLogs;
};

const showMostFrequentError = (logs) => {
  const errorStats = countErrors(logs);
  let mostFrequentError = null;
  let maxCount = 0;
  for (const error in errorStats) {
    if (errorStats[error] > maxCount) {
      mostFrequentError = error;
      maxCount = errorStats[error];
    }
  }
  return mostFrequentError;
};

module.exports = {
  countErrors,
  groupByType,
  showMostFrequentError
};