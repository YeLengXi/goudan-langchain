const fs = require('fs');
const path = require('path');

const appLogPath = path.join(__dirname, './app.log');
const appLog = fs.readFileSync(appLogPath, 'utf8');

const logLines = appLog.split('\n');

const parseLog = (logLine) => {
  const logRegex = /^\[(.*?)\] (\w+) - (.*?)$/;
  const match = logLine.match(logRegex);

  if (!match) return null;

  return {
    timestamp: match[1],
    level: match[2],
    message: match[3]
  };
};

const parsedLogs = logLines.map(parseLog);

const errorStats = parsedLogs.filter(log => log.level === 'ERROR').reduce((acc, log) => {
  const errorType = log.message.match(/^(.*?):/)[1];
  acc[errorType] = (acc[errorType] || 0) + 1;
  return acc;
}, {});

module.exports = {
  parsedLogs,
  errorStats
};
