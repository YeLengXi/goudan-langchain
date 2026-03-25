const generateErrorReport = (errorStats) => {
  const errorReport = {
    totalErrors: errorStats.totalErrors,
    errorTypes: errorStats.errorTypes,
    mostFrequentError: errorStats.mostFrequentError
  };

  return JSON.stringify(errorReport, null, 2);
};

module.exports = { generateErrorReport };