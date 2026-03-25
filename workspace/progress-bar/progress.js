const ProgressBar = require('./progress.js');

// 创建单个进度条
function createSingleProgressBar(total, width, complete, incomplete) {
  const bar = new ProgressBar({
    total: total,
    width: width,
    complete: complete,
    incomplete: incomplete
  });
  return bar;
}

// 创建多进度条
function createMultiProgressBar() {
  const multi = new MultiProgressBar();
  return multi;
}

// 更新进度条
function updateProgressBar(bar, value) {
  bar.update(value);
}

// 创建多进度条中的单个进度条
function createMultiBar(multi, name, total) {
  const bar = multi.create(name, total);
  return bar;
}

module.exports = {
  createSingleProgressBar,
  createMultiProgressBar,
  updateProgressBar,
  createMultiBar
};