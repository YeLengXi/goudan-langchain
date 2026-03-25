# demo.js

const ProgressBar = require('./progress-bar/progress.js');

// 单个进度条
const bar = new ProgressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

// 更新进度条
setInterval(() => {
  bar.update(Math.floor(Math.random() * 101));
}, 100);

// 多进度条
const MultiProgressBar = require('./progress-bar/progress.js').MultiProgressBar;

const multi = new MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);

// 更新多进度条
setInterval(() => {
  bar1.update(Math.floor(Math.random() * 101));
  bar2.update(Math.floor(Math.random() * 101));
}, 100);