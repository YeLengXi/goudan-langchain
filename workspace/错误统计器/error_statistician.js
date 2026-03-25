const error_statistician = (parsedLogs) => {
  const errorTypes = {};
  parsedLogs.forEach(log => {
    if (log.level === 'ERROR') {
      errorTypes[log.message] = (errorTypes[log.message] || 0) + 1;
    }
  });

  const totalErrors = Object.keys(errorTypes).length;
  const errorTypesArray = Object.keys(errorTypes).map(type => ({
    type,
    count: errorTypes[type]
  })).sort((a, b) => b.count - a.count);
  const mostFrequentError = errorTypesArray[0] || { type: 'No errors', count: 0 };

  return {
    totalErrors,
    errorTypes: errorTypesArray,
    mostFrequentError
  };
};

module.exports = { error_statistician };