const fs = require('fs');
const path = require('path');
const { analyzeLog } = require('./log-analyzer');
const { errorStats } = require('./错误统计器');
const { searchLogs } = require('./搜索引擎');

const exportToJSON = (logData) => {
    const data = JSON.stringify(logData, null, 2);
    fs.writeFileSync(path.join(__dirname, 'exported.json'), data, 'utf-8');
};

const exportToCSV = (logData) => {
    const headers = ['type', 'line'];
    const rows = logData.map(item => [item.type, item.line]);
    const data = [headers, ...rows].map(row => row.join(',')).join('\n');
    fs.writeFileSync(path.join(__dirname, 'exported.csv'), data, 'utf-8');
};

const generateReport = (logData) => {
    const stats = errorStats(logData);
    const report = `Error Report:
${Object.keys(stats).map(key => `${key}: ${stats[key]}`).join('
')}`;
    fs.writeFileSync(path.join(__dirname, 'report.txt'), report, 'utf-8');
};

module.exports = {
    exportToJSON,
    exportToCSV,
    generateReport
};