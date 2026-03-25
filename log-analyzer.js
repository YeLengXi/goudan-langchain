const { read_file, write_file, exec_command, list_directory } = require('./tools.js');

const logParser = {
  parseApplicationLog: (log) => {
    const lines = log.split('
');
    return lines.map(line => {
      const parts = line.split(' ');
      return {
        timestamp: parts[0],
        level: parts[1],
        message: parts.slice(2).join(' ')
      }
    });
  },
  parseAccessLog: (log) => {
    const lines = log.split('
');
    return lines.map(line => {
      const parts = line.split(' ');
      return {
        timestamp: parts[3],
        ip: parts[0],
        method: parts[1],
        url: parts[2],
        status: parts[8],
        bytes: parts[9]
      }
    });
  },
  parseErrorLog: (log) => {
    const lines = log.split('
');
    return lines.map(line => {
      return {
        timestamp: line.split(':')[0],
        error: line.split(':')[1]
      }
    });
  }
};

const errorStats = {
  countErrors: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      if (log.error) {
        const errorType = log.error.split(':')[0];
        errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
      }
    });
    return errorTypes;
  },
  groupErrorsByType: (logs) => {
    const errorTypes = {};
    logs.forEach(log => {
      if (log.error) {
        const errorType = log.error.split(':')[0];
        if (!errorTypes[errorType]) {
          errorTypes[errorType] = [];
        }
        errorTypes[errorType].push(log.error);
      }
    });
    return errorTypes;
  },
  getMostFrequentError: (logs) => {
    const errorTypes = errorStats.countErrors(logs);
    let mostFrequentError = null;
    let maxCount = 0;
    for (const errorType in errorTypes) {
      if (errorTypes[errorType] > maxCount) {
        mostFrequentError = errorType;
        maxCount = errorTypes[errorType];
      }
    }
    return mostFrequentError;
  }
};

const searchEngine = {
  searchByKeyword: (logs, keyword) => {
    return logs.filter(log => log.message.includes(keyword));
  },
  filterByTimeRange: (logs, startTime, endTime) => {
    return logs.filter(log => new Date(log.timestamp) >= new Date(startTime) && new Date(log.timestamp) <= new Date(endTime));
  },
  filterByLogLevel: (logs, level) => {
    return logs.filter(log => log.level === level);
  }
};

const reportGenerator = {
  exportToJson: (logs) => {
    const jsonLogs = logs.map(log => {
      return {
        timestamp: log.timestamp,
        level: log.level,
        message: log.message
      }
    });
    return JSON.stringify(jsonLogs, null, 2);
  },
  exportToCsv: (logs) => {
    const csvLogs = logs.map(log => {
      return `${log.timestamp},${log.level},${log.message}`;
    }).join('
');
    return csvLogs;
  },
  generateStatisticsReport: (logs) => {
    const errorTypes = errorStats.groupErrorsByType(logs);
    let report = 'Error Statistics:
';
    for (const errorType in errorTypes) {
      report += `Type: ${errorType}, Count: ${errorStats.countErrors(logs)[errorType]}
`;}
    return report;
  }
};

module.exports = {
  logParser,
  errorStats,
  searchEngine,
  reportGenerator
};