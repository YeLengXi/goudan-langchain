const fs = require('fs');
const path = require('path');

const LOG_FORMATS = {
  APP: /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?(INFO|ERROR|WARN).+?$/,
  ACCESS: /^(\[.*?\]) - \[(.*?)\] "(.*?)" (\d{3}) (\d+)$/,
  ERROR: /^(.*?):(\d+):(.+)$/,
};

const analyzeLog = async (filePath, options) => {
  const logData = [];
  const fileContent = await fs.promises.readFile(filePath, 'utf8');
  const lines = fileContent.split('\n');

  lines.forEach(line => {
    Object.keys(LOG_FORMATS).forEach(format => {
      const regex = LOG_FORMATS[format];
      if (regex.test(line)) {
        logData.push({ type: format, line });
      }
    });
  });

  return logData;
};

// CLI 接口
const main = () => {
  const args = process.argv.slice(2);
  const filePath = args[0];
  const command = args[1];

  if (!filePath) {
    console.error('用法: node log-analyzer.cjs <文件路径> [命令]');
    console.error('命令:');
    console.error('  --error        统计错误');
    console.error('  --search <词>  搜索关键词');
    console.error('  --export <格式> 导出 (json|csv)');
    process.exit(1);
  }

  analyzeLog(filePath).then(logData => {
    console.log(`解析了 ${logData.length} 条日志`);

    if (command === '--error') {
      const { countErrors } = require('./log-analyzer/错误统计器');
      const errors = countErrors(logData);
      console.log('错误统计:', errors);
    } else if (command === '--search') {
      const keyword = args[2];
      const filtered = logData.filter(entry => entry.line.includes(keyword));
      console.log(`找到 ${filtered.length} 条匹配的日志`);
      filtered.forEach(entry => console.log(entry.line));
    } else if (command === '--export') {
      const format = args[2];
      if (format === 'json') {
        console.log(JSON.stringify(logData, null, 2));
      } else if (format === 'csv') {
        console.log('type,line');
        logData.forEach(entry => console.log(`${entry.type},"${entry.line}"`));
      }
    } else {
      console.log(`解析完成，共 ${logData.length} 条日志`);
    }
  }).catch(error => {
    console.error('错误:', error.message);
    process.exit(1);
  });
};

if (require.main === module) {
  main();
}

module.exports = { analyzeLog, LOG_FORMATS };
