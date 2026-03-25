// 错误统计器
const errorStatistics = {
  countErrors: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      if (log.level === 'ERROR') {
        const errorType = log.message;
        if (errorTypes[errorType]) {
          errorTypes[errorType] += 1;
        } else {
          errorTypes[errorType] = 1;
        }
      }
    });
    return errorTypes;
  },
  groupByErrorType: (logs) => {
    const errorTypes = errorStatistics.countErrors(logs);
    return Object.entries(errorTypes).map(([type, count]) => ({
      type,
      count
    }));
  },
  displayMostFrequentError: (logs) => {
    const errorTypes = errorStatistics.countErrors(logs);
    const mostFrequentError = Object.entries(errorTypes).reduce((a, b) => a[1] > b[1] ? a : b);
    return mostFrequentError;
  }
};