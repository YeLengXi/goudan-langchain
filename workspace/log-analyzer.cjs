const read_file = require('fs').readFileSync;

const parseAppLog = (logData) => {
  const lines = logData.split('
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

const parseApacheLog = (logData) => {
  const lines = logData.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    const timestamp = line.match(/\d{2}-\d{2}-\d{4}:\d{2}:\d{2}:\d{2}/);
    const level = 'ACCESS';
    const message = line.replace(timestamp, '').trim();

    parsedLogs.push({ timestamp, level, message });
  });

  return parsedLogs;
};

const parseErrorLog = (logData) => {
  const lines = logData.split('
');
  const parsedLogs = [];

  lines.forEach(line => {
    const timestamp = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
    const level = 'ERROR';
    const message = line.replace(timestamp, '').trim();

    parsedLogs.push({ timestamp, level, message });
  });

  return parsedLogs;
};

module.exports = {
  parseAppLog,
  parseApacheLog,
  parseErrorLog
}