const read_file = require('fs').readFileSync;

const logParser = {
  parseAppLog: (log) => {
    const lines = log.split('
');
    const parsedLogs = lines.map(line => {
      const parts = line.split(' ');
      return {
        timestamp: parts[0],
        level: parts[1],
        message: parts.slice(2).join(' ')
      }
    }).filter(log => log.timestamp && log.level && log.message);
    return parsedLogs;
  },
  parseAccessLog: (log) => {
    const lines = log.split('
');
    const parsedLogs = lines.map(line => {
      const parts = line.split(' ');
      return {
        timestamp: parts[0] + ' ' + parts[1],
        ip: parts[1],
        method: parts[5],
        url: parts[6],
        status: parts[8],
        bytes: parts[9]
      }
    }).filter(log => log.timestamp && log.ip && log.method && log.url && log.status && log.bytes);
    return parsedLogs;
  },
  parseErrorLog: (log) => {
    const lines = log.split('
');
    const parsedLogs = lines.map(line => {
      const parts = line.split(':');
      return {
        file: parts[0],
        line: parts[1],
        method: parts[2],
        error: parts.slice(3).join(':')
      }
    }).filter(log => log.file && log.line && log.method && log.error);
    return parsedLogs;
  }
};

module.exports = logParser;