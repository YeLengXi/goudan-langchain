# log-analyzer.cjs

const read_file = require('./日志解析器');
const error_statistics = require('./错误统计器');
const search_engine = require('./搜索引擎');
const report_generator = require('./报告生成器');

const args = process.argv.slice(2);
const filePath = args[0];
const options = args.slice(1);

// 读取日志文件
const logContent = read_file(filePath);

// 分析日志
let analysisResult;
if (options.includes('--error')) {
  analysisResult = error_statistics(logContent);
} else if (options.includes('--search')) {
  const searchKeyword = options.find(option => option.startsWith('--search ')).split(' ')[1];
  analysisResult = search_engine(logContent, searchKeyword);
}

// 导出结果
if (options.includes('--export')) {
  const exportFormat = options.find(option => option.startsWith('--export ')).split(' ')[1];
  report_generator(analysisResult, exportFormat);
}