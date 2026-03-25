const parseLog = (logContent) => {
  const lines = logContent.split('\n');
  const parsedLogs = [];

  lines.forEach(line => {
    if (line.startsWith('[')) {
      const timestamp = line.split('] ')[0].slice(1, -1);
      const level = line.split('] ')[1].split(' ')[0];
      const message = line.split('] ')[1].split(' ')[1];
      parsedLogs.push({ timestamp, level, message });
    } else if (line.startsWith('[')) {
      const timestamp = line.split('] ')[0].slice(1, -1);
      const level = line.split('] ')[1];
      const message = line.split('] ')[2];
      parsedLogs.push({ timestamp, level, message });
    } else if (line.startsWith('[')) {
      const timestamp = line.split('] ')[0].slice(1, -1);
      const level = line.split('] ')[1];
      const message = line.split('] ')[2];
      parsedLogs.push({ timestamp, level, message });
    }
  });

  return parsedLogs;
};

module.exports = { parseLog };