const fs = require('fs');
const path = require('path');

const searchLogs = (filePath, keyword, startTime, endTime, level) => {
  const logData = fs.readFileSync(filePath, 'utf-8');
  const lines = logData.split('
');
  const filteredLogs = lines.filter(line => {
    const match = parseLog(line, 'APP');
    if (!match) return false;

    const logTime = new Date(match[1]);
    const logLevel = match[2];

    return (keyword ? line.includes(keyword) : true) &&
           (startTime ? logTime >= new Date(startTime) : true) &&
           (endTime ? logTime <= new Date(endTime) : true) &&
           (level ? logLevel === level : true);
  });

  return filteredLogs;
};

module.exports = {
  searchLogs
}