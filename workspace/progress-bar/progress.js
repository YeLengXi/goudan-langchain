const ProgressBar = require('./progress.js');

// 创建单个进度条实例
function createProgressBar(options) {
  const { total, width, complete, incomplete } = options;
  let current = 0;
  let startTime = Date.now();

  return {
    update: function (value) {
      current = value;
      const percentage = (current / total) * 100;
      const completeLength = Math.round((percentage / 100) * width);
      const incompleteLength = width - completeLength;
      const bar = complete.repeat(completeLength) + incomplete.repeat(incompleteLength);
      const elapsedTime = (Date.now() - startTime) / 1000;
      const estimatedTime = elapsedTime * (total / current) - elapsedTime;
      const speed = current / elapsedTime;

      console.log(`Processing files... [${bar}] ${percentage.toFixed(2)}% | ETA: ${estimatedTime.toFixed(2)}s | ${current}/${total} files | ${speed.toFixed(2)} files/s`);
    }
  }
}

// 创建多进度条实例
function createMultiProgressBar() {
  const bars = [];

  return {
    create: function (label, total) {
      const bar = createProgressBar({ total, width: 40, complete: '█', incomplete: '░' });
      bars.push({ bar, label, total });
      return bar;
    },
    update: function () {
      bars.forEach(bar => {
        bar.bar.update(bar.current);
      });
    }
  }
}

module.exports = { ProgressBar: createProgressBar, MultiProgressBar: createMultiProgressBar };