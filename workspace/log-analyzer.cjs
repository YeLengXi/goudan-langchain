const fs = require('fs');

const analyzeLog = (filePath, options) => {
  const content = fs.readFileSync(filePath, 'utf8').split('
');

  // Log parsing
  let parsedLogs = [];
  content.forEach(line => {
    if (line.includes('INFO') || line.includes('DEBUG') || line.includes('ERROR')) {
      parsedLogs.push(line);
    }
  });

  // Error statistics
  let errorCounts = {};
  parsedLogs.forEach(log => {
    if (log.includes('ERROR')) {
      const errorType = log.split(' ')[3];
      errorCounts[errorType] = (errorCounts[errorType] || 0) + 1;
    }
  });

  // Search and filter
  let filteredLogs = parsedLogs.filter(log => {
    return options.search ? log.includes(options.search) : true;
  });

  // Export
  if (options.export === 'json') {
    const jsonContent = JSON.stringify({ logs: filteredLogs, errorCounts: errorCounts }, null, 2);
    return jsonContent;
  } else if (options.export === 'csv') {
    const csvContent = parsedLogs.map(log => log.split(' ')).join('
');
    return csvContent;
  }

  return { logs: filteredLogs, errorCounts: errorCounts };
};

module.exports = analyzeLog;