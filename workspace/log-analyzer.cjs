const read_file = require('fs').readFileSync;

const parseAppLog = (logContent) => {
  const lines = logContent.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    const timestamp = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    const level = line.match(/INFO|WARN|ERROR/);
    const message = line.match(/.+/);

    if (timestamp && level && message) {
      parsedLogs.push({
        timestamp: timestamp[0],
        level: level[0],
        message: message[0]
      });
    }
  });

  return parsedLogs;
};

const parseApacheLog = (logContent) => {
  const lines = logContent.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    const timestamp = line.match(/\d{2}/);
    const ip = line.match(/(\d{1,3}\.){3}\d{1,3}/);
    const method = line.match(/(GET|POST|PUT|DELETE)/);
    const url = line.match(/\/);
    const status = line.match(/\d{3}/);

    if (timestamp && ip && method && url && status) {
      parsedLogs.push({
        timestamp: timestamp[0],
        ip: ip[0],
        method: method[0],
        url: url[0],
        status: status[0]
      });
    }
  });

  return parsedLogs;
};

const parseErrorLog = (logContent) => {
  const lines = logContent.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    const stackTrace = line.match(/at .+/);

    if (stackTrace) {
      parsedLogs.push({
        stackTrace: stackTrace[0]
      });
    }
  });

  return parsedLogs;
};

module.exports = {
  parseAppLog,
  parseApacheLog,
  parseErrorLog
}