const ProgressBar = require('./progress.js');

const multi = new ProgressBar.MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);

for (let i = 0; i <= 100; i++) {
  bar1.update(i);
  bar2.update(i);
  // Do some work here
}

multi.render();