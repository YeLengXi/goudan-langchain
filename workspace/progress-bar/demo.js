const ProgressBar = require('./progress.js');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the total number of tasks: ', (total) => {
  const bar = new ProgressBar({ total: parseInt(total), width: 40, complete: '█', incomplete: '░', style: 'standard' });

  for (let i = 0; i < total; i++) {
    bar.update(i + 1);
    // Simulate some work
    setTimeout(() => { bar.update(i + 1); }, 1000);
  }

  bar.finish();

  rl.close();
});