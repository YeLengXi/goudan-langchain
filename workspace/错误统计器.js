# 错误统计器

const countErrors = (logs) => {
  const errorTypes = {};
  logs.forEach(log => {
    if (log.error) {
      errorTypes[log.error] = (errorTypes[log.error] || 0) + 1;
    }
  });
  return errorTypes;
};

const groupByErrorType = (logs) => {
  const errorTypes = countErrors(logs);
  return Object.keys(errorTypes).map(type => ({
    type,
    count: errorTypes[type]
  }));
};

const getMostFrequentError = (logs) => {
  const errorTypes = countErrors(logs);
  let mostFrequentError = null;
  let maxCount = 0;
  for (const [type, count] of Object.entries(errorTypes)) {
    if (count > maxCount) {
      mostFrequentError = type;
      maxCount = count;
    }
  }
  return mostFrequentError;
};

module.exports = {
  countErrors,
  groupByErrorType,
  getMostFrequentError
};