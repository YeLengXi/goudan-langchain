const fs = require('fs');
const path = require('path');
const readline = require('readline');

const logFormats = {
  APP: /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?(INFO|ERROR|WARN).*/g,
  APACHE: /^(\d{2}/\w{3}/\d{4}:\d{2}:\d{2}:\d{2} \S+) "(\S+) (\S+) (\S+)" "(\S+)" "(\S+)"$/g,
  ERROR: /^(.*):\s*(at|throw of) (.*)$/gm
};

function parseLog(logData, format) {
  const regex = logFormats[format];
  const logs = [];
  let match;

  while ((match = regex.exec(logData)) !== null) {
    logs.push(match[0]);
  }

  return logs;
}

function countErrors(logs) {
  const errorTypes = {};
  logs.forEach(log => {
    const match = log.match(/ERROR: (.*)/);
    if (match) {
      const errorType = match[1];
      errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
    }
  });
  return errorTypes;
}

function searchLogs(logs, keyword, level) {
  return logs.filter(log => {
    return log.includes(keyword) && (level ? log.includes(level) : true);
  });
}

function exportLogs(logs, format) {
  if (format === 'json') {
    return JSON.stringify(logs, null, 2);
  } else if (format === 'csv') {
    return logs.map(log => log.split(' ').join(',')).join('\n');
  }
}

function analyzeLog(logFilePath) {
  const logData = fs.readFileSync(logFilePath, 'utf8');
  const logs = parseLog(logData, 'APP');
  return logs;
}

module.exports = {
  analyzeLog,
  countErrors,
  searchLogs,
  exportLogs
}
