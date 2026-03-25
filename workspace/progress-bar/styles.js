const ProgressBar = require('./progress.js');

// 标准样式
const standardStyle = (bar, percentage) => {
  return `[${bar}] ${percentage.toFixed(2)}% | ETA: ${calculateETA(bar.total, bar.current)} | ${bar.current}/${bar.total} files | ${bar.current / (Date.now() - startTime) / 1000} files/s`
}

// 点状样式
const dotsStyle = (bar, percentage) => {
  return `[${'.'.repeat(Math.floor(percentage / 10))}] ${percentage.toFixed(2)}% | ETA: ${calculateETA(bar.total, bar.current)} | ${bar.current}/${bar.total} files | ${bar.current / (Date.now() - startTime) / 1000} files/s`
}

// 箭头样式
const arrowStyle = (bar, percentage) => {
  const arrowLength = Math.floor(percentage / 10);
  return `[>>${'>'.repeat(arrowLength)}] ${percentage.toFixed(2)}% | ETA: ${calculateETA(bar.total, bar.current)} | ${bar.current}/${bar.total} files | ${bar.current / (Date.now() - startTime) / 1000} files/s`
}

// 创建样式函数
function createStyleFunction(style) {
  switch (style) {
    case 'standard':
      return standardStyle;
    case 'dots':
      return dotsStyle;
    case 'arrow':
      return arrowStyle;
    default:
      return standardStyle;
  }
}
