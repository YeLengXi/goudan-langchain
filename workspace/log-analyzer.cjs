const fs = require('fs');
const path = require('path');

const supportedFormats = ['app', 'apache', 'error'];

const parseLog = (logPath, format) => {
  let parsedLogs = [];

  switch (format) {
    case 'app':
      const appLogs = fs.readFileSync(logPath, 'utf8').split('
');
      appLogs.forEach(log => {
        const [timestamp, level, message] = log.split(' ');
        parsedLogs.push({ timestamp, level, message });
      });
      break;

    case 'apache':
      const apacheLogs = fs.readFileSync(logPath, 'utf8').split('
');
      apacheLogs.forEach(log => {
        const parts = log.split(' ');
        const timestamp = parts[3] + ' ' + parts[4];
        const level = parts[6];
        const message = parts.slice(7).join(' ');
        parsedLogs.push({ timestamp, level, message });
      });
      break;

    case 'error':
      const errorLogs = fs.readFileSync(logPath, 'utf8').split('
');
      errorLogs.forEach(log => {
        const stackTrace = log.split('
');
        parsedLogs.push({ stackTrace });
      });
      break;
  }

  return parsedLogs;
};

const countErrors = logs => {
  const errorTypes = {};
  logs.forEach(log => {
    if (log.level === 'ERROR') {
      const errorType = log.message.match(/(.+): (.+)/)[1];
      errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
    }
  });

  return errorTypes;
};

const searchLogs = (logs, keyword, startTime, endTime, level) => {
  return logs.filter(log => {
    const matchesKeyword = log.message.includes(keyword);
    const withinTimeRange = log.timestamp >= startTime && log.timestamp <= endTime;
    const matchesLevel = !level || log.level === level;

    return matchesKeyword && withinTimeRange && matchesLevel;
  });
};

const exportToJson = (logs, outputPath) => {
  fs.writeFileSync(outputPath, JSON.stringify(logs, null, 2), 'utf8');
};

const exportToCsv = (logs, outputPath) => {
  const headers = ['timestamp', 'level', 'message'];
  const rows = logs.map(log => [
    log.timestamp,
    log.level,
    log.message
  ]);
  const csv = [headers, ...rows].join('
');
  fs.writeFileSync(outputPath, csv, 'utf8');
};

module.exports = {
  parseLog,
  countErrors,
  searchLogs,
  exportToJson,
  exportToCsv
};