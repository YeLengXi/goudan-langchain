const generateJsonReport = (parsedLogs) => {
  return JSON.stringify(parsedLogs, null, 2);
};

module.exports = { generateJsonReport };