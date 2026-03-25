const fs = require('fs');
const path = require('path');

const formatDiff = (oldContent, newContent, format = 'unified') => {
  // Implementation of diff formatting
};

const compareFiles = (filePath1, filePath2, format, color) => {
  const content1 = fs.readFileSync(filePath1, 'utf8');
  const content2 = fs.readFileSync(filePath2, 'utf8');

  const diff = formatDiff(content1, content2, format);

  if (color) {
    // Add color to the diff output
  }

  console.log(diff);
};

const compareDirectories = (dirPath1, dirPath2, format, color) => {
  // Implementation of directory comparison
};

const parseArgs = () => {
  const args = process.argv.slice(2);
  let [file1, file2, , color] = args;
  let format = 'unified';

  if (color) {
    format = 'unified';
  }

  if (!file1 || !file2) {
    console.log('Usage: node diff.js <file1> <file2> [--format <format>] [--color]');
    return;
  }

  if (args.includes('--format')) {
    const formatIndex = args.indexOf('--format');
    format = args[formatIndex + 1];
  }

  const color = args.includes('--color');

  if (fs.existsSync(file1) && fs.existsSync(file2)) {
    compareFiles(file1, file2, format, color);
  } else if (fs.existsSync(dirPath1) && fs.existsSync(dirPath2)) {
    compareDirectories(dirPath1, dirPath2, format, color);
  } else {
    console.log('Files or directories not found.');
  }
};

parseArgs();