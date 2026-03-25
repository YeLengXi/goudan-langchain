const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const listDirectory = promisify(fs.readdir);
const { green, red, yellow, blue } = require('chalk');

const diffFiles = async (file1, file2, format = 'unified', color = false) => {
  const content1 = await readFile(file1, 'utf8');
  const content2 = await readFile(file2, 'utf8');

  const lines1 = content1.split('\n');
  const lines2 = content2.split('\n');

  let diff = [];
  let additions = 0;
  let deletions = 0;

  lines1.forEach((line, index) => {
    if (!lines2.includes(line)) {
      diff.push({ type: 'deleted', line });
      deletions++;
    }
  });

  lines2.forEach((line, index) => {
    if (!lines1.includes(line))
