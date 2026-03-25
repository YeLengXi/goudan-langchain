const errorsStats = (logs) => {
  const errorTypes = {};

  logs.forEach(log => {
    if (log.includes('[ERROR]')) {
      const errorType = log.split(':')[1].trim();
      if (errorTypes[errorType]) {
        errorTypes[errorType] += 1;
      } else {
        errorTypes[errorType] = 1;
      }
    }
  });

  const sortedErrors = Object.entries(errorTypes).sort((a, b) => b[1] - a[1]);

  return sortedErrors;
};

module.exports = errorsStats;