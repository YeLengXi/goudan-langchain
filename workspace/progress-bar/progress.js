const ProgressBar = require('./progress.js');

// 创建一个新的进度条实例
function createProgressBar(name, total, width, complete, incomplete) {
  return new ProgressBar({
    name: name,
    total: total,
    width: width,
    complete: complete,
    incomplete: incomplete
  });
}

// 更新进度条
function updateProgressBar(bar, value) {
  bar.update(value);
}

// 创建多进度条实例
function createMultiProgressBar() {
  return {
    bars: [],
    create: function(name, total) {
      const bar = createProgressBar(name, total, 40, '█', '░');
      this.bars.push(bar);
      return bar;
    },
    update: function() {
      this.bars.forEach(bar => {
        bar.update();
      });
    }
  }
}
