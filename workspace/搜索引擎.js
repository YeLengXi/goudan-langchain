const read_file = require('fs').readFileSync;

const searchLogs = (logContent, keyword, startTime, endTime, level) => {
  const lines = logContent.split('
');
  const filteredLogs = [];

  lines.forEach(line => {
    const matchesKeyword = line.includes(keyword);
    const matchesStartTime = !startTime || new Date(line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)[0]).getTime() >= startTime.getTime();
    const matchesEndTime = !endTime || new Date(line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)[0]).getTime() <= endTime.getTime();
    const matchesLevel = !level || line.includes(level);

    if (matchesKeyword && matchesStartTime && matchesEndTime && matchesLevel) {
      filteredLogs.push(line);
    }
  });

  return filteredLogs.join('
');
};

module.exports = {
  searchLogs
}