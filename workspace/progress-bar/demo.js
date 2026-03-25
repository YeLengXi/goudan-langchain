# demo.js

const ProgressBar = require('./progress-bar/progress.js');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const styles = ['standard', 'dots', 'multi'];

// 标准进度条
const bar = new ProgressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

// 多进度条
const multi = new MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);

function updateProgress() {
  bar.update(Math.floor(Math.random() * 100));
  multi.update();
  setTimeout(updateProgress, 100);
}

if (styles.includes(args.style)) {
  if (args.style === 'standard') {
    updateProgress();
  } else if (args.style === 'dots') {
    bar.complete = 'o';
    bar.incomplete = ' ';
    updateProgress();
  } else if (args.style === 'multi') {
    updateProgress();
  }
} else {
  console.log('Invalid style
Available styles: standard, dots, multi');
}