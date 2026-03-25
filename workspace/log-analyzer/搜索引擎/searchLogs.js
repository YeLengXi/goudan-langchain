const searchLogs = (logs, options) => {
  const { keyword, startTime, endTime, level } = options;

  return logs.filter(log => {
    if (keyword && !log.includes(keyword)) {
      return false;
    }
    if (startTime && new Date(log) < new Date(startTime)) {
      return false;
    }
    if (endTime && new Date(log) > new Date(endTime)) {
      return false;
    }
    if (level && !log.includes(level)) {
      return false;
    }
    return true;
  });
}

module.exports = searchLogs;