const read_file = require('fs').readFileSync;

module.exports = {
  parseAppLog: (logContent) => {
    const lines = logContent.split('\n');
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
  parseApacheLog: (logContent) => {
    const lines = logContent.split('\n');
    const parsedLogs = lines.map(line => {
      const parts = line.split(' ');
      return {
        timestamp: parts[3],
        level: 'INFO',
        message: parts.slice(4).join(' '),
      }
    });
    return parsedLogs;
  },
  parseErrorLog: (logContent) => {
    const lines = logContent.split('\n');
    const parsedLogs = lines.map(line => {
      const parts = line.split(':');
      return {
        timestamp: parts[0],
        level: 'ERROR',
        message: parts[1],
      }
    });
    return parsedLogs;
  }
}