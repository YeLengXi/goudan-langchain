const fs = require('fs');
const path = require('path');
const readline = require('readline');

function searchLogs(parsedData, keyword, startTime, endTime, level) {
  return parsedData.filter(entry => {
    const includesKeyword = entry.message.includes(keyword);
    const withinTimeRange = entry.timestamp >= startTime && entry.timestamp <= endTime;
    const matchesLevel = level ? entry.level === level : true;

    return includesKeyword && withinTimeRange && matchesLevel;
  });
}

module.exports = {
  searchLogs
}