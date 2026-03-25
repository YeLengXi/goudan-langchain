const exportData = (logs, options) => {
  if (options.format === 'json') {
    return JSON.stringify(logs, null, 2);
  } else if (options.format === 'csv') {
    const headers = Object.keys(logs[0]).join(',
');
    const rows = logs.map(log => Object.values(log).join(',')).join('
');
    return headers + '
' + rows;
  } else {
    return logs.join('
');n  }
}

module.exports = exportData;