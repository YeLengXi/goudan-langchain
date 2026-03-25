const ProgressBar = require('./progress.js');

// Create a single progress bar
const bar = new ProgressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

// Update the progress bar
for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // Do some work here
}

// Create a multi-progress bar
const multi = new ProgressBar({
  multi: true
});

const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);

// Update the progress bars
for (let i = 0; i <= 100; i++) {
  bar1.update(i);
  bar2.update(i);
}
