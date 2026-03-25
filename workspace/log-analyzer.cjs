const read_file = require('fs').readFileSync;

const parseAppLog = (logContent) => {
  const lines = logContent.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    const timestamp = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    const level = line.match(/INFO|WARN|ERROR/);
    const message = line.replace(timestamp, '').replace(level, '').trim();

    parsedLogs.push({ timestamp, level, message });
  });

  return parsedLogs;
};

const parseApacheLog = (logContent) => {
  const lines = logContent.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    const timestamp = line.match(/\d{2}/);
    const ip = line.match(/\d+\.\d+\.\d+\.\d+/);
    const method = line.match(/\S+/);
    const url = line.match(/\S+/);
    const status = line.match(/\d+/);

    parsedLogs.push({ timestamp, ip, method, url, status });
  });

  return parsedLogs;
};

const parseErrorLog = (logContent) => {
  const lines = logContent.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    const stackTrace = line.match(/at .+/);
    parsedLogs.push({ stackTrace });
  });

  return parsedLogs;
};

module.exports = {
  parseAppLog,
  parseApacheLog,
  parseErrorLog
}