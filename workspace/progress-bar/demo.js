const ProgressBar = require('./progress.js');

// 创建一个进度条实例
const bar = new ProgressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

// 更新进度条
bar.update(50);

// 创建一个多进度条实例
const multi = new MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);
