const read_file = require('fs').readFileSync;
const write_file = require('fs').writeFileSync;
const exec_command = require('child_process').exec;

// 搜索引擎
function searchLogs(logContent, keyword, startTime, endTime, level) {
  const lines = logContent.split('\n');
  const results = [];
  lines.forEach(line => {
    if (line.includes(keyword) && line.includes(level) && line.includes(startTime) && line.includes(endTime)) {
      results.push(line);
    }
  });
  return results;
}

module.exports = {
  searchLogs
}