const fs = require('fs');

const exportToJson = (logs) => {
  const data = JSON.stringify(logs, null, 2);
  fs.writeFileSync('exported_logs.json', data);
};

const exportToCsv = (logs) => {
  const headers = Object.keys(logs[0]).join(',
');
  const rows = logs.map(log => Object.values(log).join(',')).join('
');
  const csvData = headers + '
' + rows;
  fs.writeFileSync('exported_logs.csv', csvData);
};

module.exports = {
  exportToJson,
  exportToCsv
}