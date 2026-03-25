const fs = require('fs');

const logParser = {
  parseAppLog: (log) => {
    const lines = log.split('\n');
    const parsedLogs = lines.map(line => {
      const parts = line.split(' ');
      return {
        timestamp: parts[0],
        level: parts[1],
        message: parts.slice(2).join(' '),
      }
    });
    return parsedLogs;
  },
  parseApacheLog: (log) => {
    const lines = log.split('\n');
    const parsedLogs = lines.map(line => {
      const parts = line.split(' ');
      return {
        timestamp: parts[0],
        clientIP: parts[1],
        method: parts[5],
        url: parts[6],
        status: parts[8],
        bytes: parts[9],
      }
    });
    return parsedLogs;
  },
  parseErrorLog: (log) => {
    const lines = log.split('\n');
    const parsedLogs = lines.map(line => {
      const parts = line.split(' ');
      return {
        timestamp: parts[0],
        level: parts[1],
        message: parts.slice(2).join(' '),
        stack: parts.slice(2).join(' ')
      }
    });
    return parsedLogs;
  }
};

const errorCounter = {
  countErrors: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      if (log.level === 'ERROR') {
        const errorType = log.message.match(/(.*):/)[1];
        errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
      }
    });
    return errorTypes;
  }
};

const searchLogs = (logs, keyword, startTime, endTime, level) => {
  return logs.filter(log => {
    return log.message.includes(keyword) &&
           log.timestamp >= startTime &&
           log.timestamp <= endTime &&
           log.level === level;
  });
};

const exportLogs = (logs, format) => {
  if (format === 'json') {
    return JSON.stringify(logs, null, 2);
  } else if (format === 'csv') {
    const headers = ['Timestamp', 'Level', 'Message'];
    const rows = logs.map(log => [
      log.timestamp,
      log.level,
      log.message
    ]);
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }
}
