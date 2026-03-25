# demo.js

// 引入进度条模块
const ProgressBar = require('./progress.js');

// 单个进度条示例
const bar = new ProgressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

// 更新进度条
function updateBar() {
  for (let i = 0; i <= 100; i++) {
    bar.update(i);
    console.log(bar);
    // 模拟耗时操作
    setTimeout(() => {}, 100);
  }
}

// 多进度条示例
function updateMultiBar() {
  const multi = new MultiProgressBar();
  const bar1 = multi.create('Download', 100);
  const bar2 = multi.create('Upload', 100);

  for (let i = 0; i <= 100; i++) {
    bar1.update(i);
    bar2.update(i);
    console.log(multi);
    // 模拟耗时操作
    setTimeout(() => {}, 100);
  }
}

// 根据命令行参数执行相应的操作
const args = process.argv.slice(2);

if (args.includes('--style')) {
  if (args[0] === '--style' && args[1] === 'standard') {
    updateBar();
  } else if (args[0] === '--style' && args[1] === 'dots') {
    updateBar();
  }
} else if (args.includes('--multi')) {
  updateMultiBar();
}