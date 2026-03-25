const ProgressBar = require('./progress.js');

const { program } = require('commander');

program
  .option('--style <type>', '选择进度条样式', 'standard')
  .option('--multi', '启用多进度条模式');

program.parse(process.argv);

const style = program.opts().style;
const multi = program.opts().multi;

if (multi) {
  const multiBar = new ProgressBar.MultiProgressBar();
  const bar1 = multiBar.create('Download', 100);
  const bar2 = multiBar.create('Upload', 100);

  for (let i = 0; i <= 100; i++) {
    bar1.update(i);
    bar2.update(i);
    // 做一些工作
  }
} else {
  const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });

  for (let i = 0; i <= 100; i++) {
    bar.update(i);
    // 做一些工作
  }
}
