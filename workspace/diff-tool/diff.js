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

  const lines1 = content1.split('
');
  const lines2 = content2.split('
');

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
    if (!lines1.includes(line)) {
      diff.push({ type: 'added', line });
      additions++;
    }
  });

  diff.forEach(({ type, line }) => {
    if (type === 'deleted') {
      diff.push({ type: 'context', line });
    }
  });

  if (format === 'unified') {
    diff = diff.map(({ type, line }) => {
      if (type === 'deleted') {
        return '- ' + line;
      } else if (type === 'added') {
        return '+ ' + line;
      } else if (type === 'context') {
        return blue('@@ -1,3 +1,3 @@');
      }
    });
  }

  if (color) {
    diff = diff.map(line => {
      if (line.startsWith('-')) {
        return red(line);
      } else if (line.startsWith('+')) {
        return green(line);
      }
    });
  }

  return { diff, additions, deletions };
};

const diffDirectories = async (dir1, dir2, format = 'unified', color = false) => {
  const files1 = await listDirectory(dir1);
  const files2 = await listDirectory(dir2);

  let diff = [];
  let additions = 0;
  let deletions = 0;

  files1.forEach(file => {
    if (!files2.includes(file)) {
      diff.push({ type: 'deleted', file });
      deletions++;
    }
  });

  files2.forEach(file => {
    if (!files1.includes(file)) {
      diff.push({ type: 'added', file });
      additions++;
    }
  });

  return { diff, additions, deletions };
};

module.exports = { diffFiles, diffDirectories };