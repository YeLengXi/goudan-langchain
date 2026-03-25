const ProgressBar = require('./progress.js');

// 创建一个进度条对象
function createProgressBar(options) {
  const { total, width, complete, incomplete } = options;
  let current = 0;
  let startTime = Date.now();

  return {
    update: (value) => {
      current = value;
      const percent = (current / total) * 100;
      const elapsed = Date.now() - startTime;
      const eta = elapsed * (total / current) - elapsed;
      const speed = current / elapsed;
      const filledLength = Math.round(width * (current / total));
      const bar = complete.repeat(filledLength) + incomplete.repeat(width - filledLength);
      const progressString = \[${bar}] ${percent.toFixed(2)}% | ETA: ${eta.toFixed(2)}s | ${current}/${total} items | ${speed.toFixed(2)} items/s\n
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(progressString);
    },
    finish: () => {
      process.stdout.write('\n');
    }
  }
}

// 创建一个多进度条对象
function createMultiProgressBar() {
  const bars = [];
  return {
    create: (name, total) => {
      const bar = createProgressBar({ total, width: 20, complete: '=', incomplete: ' ' });
      bars.push({ name, bar });
      return bar;
    },
    update: () => {
      bars.forEach(bar => {
        bar.update(bar.name);
      });
    },
    finish: () => {
      bars.forEach(bar => {
        bar.finish();
      });
    }
  }
}
