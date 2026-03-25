const generateCsvReport = (parsedLogs) => {
  const csvReport = parsedLogs.map(log => {
    return [log.timestamp, log.level, log.message].join(',');
  }).join('\n');

  return csvReport;
};

module.exports = { generateCsvReport };