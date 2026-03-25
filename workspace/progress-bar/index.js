#!/usr/bin/env node

const ProgressBar = require('./progress.js');
const cliProgress = require('cli-progress');

const args = require('minimist')(process.argv.slice(2));

const styles = ['standard', 'dots', 'arrow', 'circle'];

if (!styles.includes(args.style)) {
  console.error('Invalid style. Available styles: ' + styles.join(', '));
  process.exit(1);
}

const bar = new cliProgress[args.style]({ total: 100, width: 20, renderThreshold: 0, complete: "█", incomplete: "-" }, "Progress: [:bar] :current/:total (:percent%)");

function updateProgress(value) {
  bar.update(value);
}

function finishProgress() {
  bar.finish();
}

// Simulate some work
setInterval(() => {
  updateProgress(Math.floor(Math.random() * 100));
}, 1000);

// Finish the progress after 10 seconds
setTimeout(() => {
  finishProgress();
}, 10000);
