const fs = require('fs');
const path = require('path');

const log_analyzer = require('E:\goudan-langchain\workspace\log-analyzer\log-analyzer.cjs');

// 测试日志解析功能
async function test_parse_log() {
  const file_path = 'E:\goudan-langchain\workspace\log-analyzer\test.log';
  const log_data = await log_analyzer.parse_log(file_path);
  console.log(log_data);
}

// 测试错误统计功能
async function test_count_errors() {
  const log_data = 'Error: Timeout';
  const error_count = await log_analyzer.count_errors(log_data);
  console.log(error_count);
}

// 测试搜索功能
async function test_search_logs() {
  const log_data = 'Error: Timeout';
  const keyword = 'Timeout';
  const start_time = '2023-01-01';
  const end_time = '2023-01-02';
  const log_level = 'Error';
  const search_results = await log_analyzer.search_logs(log_data, keyword, start_time, end_time, log_level);
  console.log(search_results);
}

// 测试报告生成功能
async function test_generate_report() {
  const log_data = 'Error: Timeout';
  const report = await log_analyzer.generate_report(log_data);
  console.log(report);
}

// 运行测试
async function run_tests() {
  await test_parse_log();
  await test_count_errors();
  await test_search_logs();
  await test_generate_report();
}

run_tests();