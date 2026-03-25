const fs = require('fs');
const path = require('path');

const diffFiles = (file1, file2, format = 'unified', color = false) => {
  const content1 = fs.readFileSync(file1, 'utf8');
  const content2 = fs.readFileSync(file2, 'utf8');

  const lines1 = content1.split('
');
  const lines2 = content2.split('
');

  let diff = '';
  let additions = 0;
  let deletions = 0;

  lines1.forEach((line, index) => {
    if (lines2[index] !== undefined && lines2[index] !== line) {
      diff += '- ' + line + '\n';
      diff += '+ ' + lines2[index] + '\n';
      additions++;
      deletions++;
    } else if (lines2[index] === undefined) {
      diff += '- ' + line + '\n';
      deletions++;
    } else if (lines1[index] === undefined) {
      diff += '+ ' + lines2[index] + '\n';
      additions++;
    }
  });

  if (format === 'unified') {
    diff = '--- ' + path.basename(file1) + '
+++ ' + path.basename(file2) + '
' + diff;
  }

  if (color) {
    const red = (text) => '\x1b[31m' + text + '\x1b[0m';
    const green = (text) => '\x1b[32m' + text + '\x1b[0m';

    diff = diff.replace(/-/g, red).replace(+/g, green);
  }

  return diff;
};

module.exports = { diffFiles };