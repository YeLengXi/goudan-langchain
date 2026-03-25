const parseLogs = (content) => {
  const lines = content.split('\n');
  const applicationLogs = [];
  const accessLogs = [];
  const errorLogs = [];

  lines.forEach(line => {
    if (line.includes('[INFO]') || line.includes('[DEBUG]') || line.includes('[ERROR]')) {
      applicationLogs.push(line);
    } else if (line.startsWith('[')) {
      accessLogs.push(line);
    } else {
      errorLogs.push(line);
    }
  });

  return { applicationLogs, accessLogs, errorLogs };
};

module.exports = parseLogs;