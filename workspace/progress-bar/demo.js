# demo.js

// 引入进度条模块
const ProgressBar = require('./progress.js');

// 创建单个进度条
const bar = new ProgressBar.createSingleProgressBar(100, 40, '█', '░');

// 创建多进度条
const multi = ProgressBar.createMultiProgressBar();

// 更新单个进度条
function updateSingleBar() {
  for (let i = 0; i <= 100; i++) {
    bar.update(i);
    console.log(`Processing files... [${'█'.repeat(i)}${'░'.repeat(100 - i)}] ${((i / 100) * 100).toFixed(2)}% | ETA: 0:00:05 | 12/20 files | 2.4 files/s`);
    // 模拟一些工作
    setTimeout(() => {}, 100);
  }
}

// 更新多进度条
function updateMultiBar() {
  for (let i = 0; i <= 100; i++) {
    multi.update('Download', i);
    multi.update('Upload', i);
    console.log(`Processing files... [Download: ${'█'.repeat(i)}${'░'.repeat(100 - i)}] [Upload: ${'█'.repeat(i)}${'░'.repeat(100 - i)}] ${((i / 100) * 100).toFixed(2)}% | ETA: 0:00:05 | 12/20 files | 2.4 files/s`);
    // 模拟一些工作
    setTimeout(() => {}, 100);
  }
}

// 运行单个进度条
updateSingleBar();

// 运行多进度条
// updateMultiBar();