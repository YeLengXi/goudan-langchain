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
  // Simulate some work
  setTimeout(() => {}, 100);
}

// Finish the progress bar
bar.finish();