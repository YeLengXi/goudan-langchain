const read_file = require('fs').readFileSync;

module.exports = {
  parseAppLog: (log) => {
    const lines = log.split('
');
    const parsedLogs = lines.map(line => {
      const timestamp = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)[0];
      const level = line.match(/INFO|WARN|ERROR/)[0];
      const message = line.replace(timestamp + ' ', '').trim();
      return {
        timestamp,
        level,
        message
      }
    });
    return parsedLogs;
  },

  parseApacheLog: (log) => {
    const lines = log.split('
');
    const parsedLogs = lines.map(line => {
      const timestamp = line.match(/\d{2}/)[0] + '/' + line.match(/\d{2}/)[1] + '/' + line.match(/\d{4}/)[0] + ' ';
      const level = 'ACCESS';
      const message = line.replace(timestamp, '').trim();
      return {
        timestamp,
        level,
        message
      }
    });
    return parsedLogs;
  },

  parseErrorLog: (log) => {
    const lines = log.split('
');
    const parsedLogs = lines.map(line => {
      const timestamp = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)[0];
      const level = 'ERROR';
      const message = line.replace(timestamp + ' ', '').trim();
      return {
        timestamp,
        level,
        message
      }
    });
    return parsedLogs;
  }
}