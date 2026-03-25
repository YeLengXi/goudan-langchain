# 错误统计器

// 统计错误数量
const countErrors = (logs) => {
  return logs.filter(log => log.level === 'ERROR').length;
};

// 按类型分组
const groupErrorsByType = (logs) => {
  const errorTypes = logs.reduce((acc, log) => {
    if (log.level === 'ERROR') {
      acc[log.message] = (acc[log.message] || 0) + 1;
    }
    return acc;
  }, {});
  return errorTypes;
};

// 显示最频繁的错误
const showMostFrequentError = (logs) => {
  const errorTypes = groupErrorsByType(logs);
  let mostFrequentError = '';
  let maxCount = 0;
  for (const [error, count] of Object.entries(errorTypes)) {
    if (count > maxCount) {
      mostFrequentError = error;
      maxCount = count;
    }
  }
  return mostFrequentError;
};

module.exports = {
  countErrors,
  groupErrorsByType,
  showMostFrequentError
};