# 进度条工具

这是一个命令行进度条工具，用于显示长时间运行任务的进度。

## 安装

npm install

## 使用

// 创建单个进度条
const ProgressBar = require('progress-bar');
const bar = new ProgressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

// 更新进度条
bar.update(i);

// 创建多进度条
const MultiProgressBar = require('progress-bar').MultiProgressBar;
const multi = new MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);
