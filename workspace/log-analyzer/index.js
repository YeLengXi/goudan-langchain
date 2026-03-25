const fs = require('fs');
const path = require('path');
const { parseLog } = require('./log-analyzer.cjs');
const { countErrors } = require('./错误统计器.js');
const { searchLogs } = require('./搜索引擎.js');
const { exportLogs } = require('./报告生成器.js');

const analyzeLog = (args) => {
  const logPath = args._[1];
  const format = args._.includes('--error') ? 'error' : 'app';
  const exportFormat = args._.includes('--export') ? args._[args._.indexOf('--export') + 1] : 'json';

  let logData = parseLog(logPath, format);

  if (args._.includes('--error')) {
    logData = countErrors(logData);
  }

  if (args._.includes('--search')) {
    const searchKeyword = args._[args._.indexOf('--search') + 1];
    const timeRange = args._.includes('--time-range') ? {
      start: args._[args._.indexOf('--time-range') + 1],
      end: args._[args._.indexOf('--time-range') + 2]
    } : null;
    const level = args._.includes('--level') ? args._[args._.indexOf('--level') + 1] : null;
    logData = searchLogs(logPath, searchKeyword, timeRange, level);
  }

  const exportPath = path.join(__dirname, 'exported-log.' + exportFormat);
  fs.writeFileSync(exportPath, exportLogs(logData, exportFormat));
  console.log('Exported to', exportPath);
};

analyzeLog(process.argv);
