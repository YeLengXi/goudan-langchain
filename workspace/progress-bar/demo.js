const ProgressBar = require('./progress.js');

const cliProgress = require('cli-progress');

const bar = new cliProgress.SingleBar({ total: 100, width: 40, complete: '█', incomplete: ' ' }, 'progress');

const multiBar = new cliProgress.MultiBar({ total: 100, width: 40, complete: '█', incomplete: ' ' }, true);

const downloadBar = multiBar.create('Download', 100);
const uploadBar = multiBar.create('Upload', 100);

const total = 100;
let completed = 0;

function updateProgress() {
  bar.update(completed);
  downloadBar.update(completed);
  uploadBar.update(completed);
  completed += 10;
  if (completed >= total) {
    bar.finish();
    multiBar.finish();
  }
}

setInterval(updateProgress, 100);