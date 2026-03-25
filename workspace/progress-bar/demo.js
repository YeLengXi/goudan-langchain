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
  // Perform some work
}

// Create multiple progress bars
const multi = new MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);
