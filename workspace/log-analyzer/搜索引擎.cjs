const analyzeLog = require('./log-analyzer');
const fs = require('fs');
const path = require('path');

const searchLogs = (logData, keywords, startTime, endTime, level) => {
  return logData.filter(entry => {
    const matchesKeywords = keywords.some(keyword => entry.line.includes(keyword));
    const matchesTime = entry.line.includes(startTime) || entry.line.includes(endTime);
    const matchesLevel = !level || entry.line.includes(level);

    return matchesKeywords && matchesTime && matchesLevel;
  });
};

module.exports = { searchLogs };