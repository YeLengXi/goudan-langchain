const ProgressBar = require('./progress.js');

const cliProgress = require('cli-progress');

const multiProgress = new cliProgress.MultiBar({ clearOnComplete: true, hideCursor: true }, [1]);

const downloadBar = multiProgress.create('Download', 100);
const uploadBar = multiProgress.create('Upload', 100);

let downloadProgress = 0;
let uploadProgress = 0;

function updateProgress() {
  downloadProgress += 5;
  uploadProgress += 10;
  downloadBar.update(downloadProgress);
  uploadBar.update(uploadProgress);
}

setInterval(updateProgress, 1000);
