const { read_file, write_file, exec_command, list_directory } = require('./utils');

module.exports = {
  parseLog: async (filePath) => {
    const content = await read_file(filePath);
    return content;
  },

  countErrors: async (logContent) => {
    const errorTypes = logContent.match(/Error:.*/g);
    const errorCounts = errorTypes.reduce((acc, errorType) => {
      const type = errorType.match(/Error:(.*)/)[1];
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const sortedErrorCounts = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]);
    const mostFrequentError = sortedErrorCounts[0][0];

    return {
      errorCounts,
      mostFrequentError
    };
  },

  searchLogs: async (logContent, keyword, startTime, endTime, level) => {
    const regex = new RegExp(keyword, 'i');
    let filteredLogs = logContent.match(regex);

    if (startTime) {
      filteredLogs = filteredLogs.filter(log => log.includes(startTime));
    }

    if (endTime) {
      filteredLogs = filteredLogs.filter(log => log.includes(endTime));
    }

    if (level) {
      filteredLogs = filteredLogs.filter(log => log.includes(level));
    }

    return filteredLogs;
  },

  exportLogs: async (logContent, format) => {
    if (format === 'json') {
      return JSON.stringify(logContent);
    } else if (format === 'csv') {
      return logContent.join('
');
    }
  }
};