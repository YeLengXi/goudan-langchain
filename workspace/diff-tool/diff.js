const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const diff = (files, options) => {
  if (files.length !== 2) {
    console.error('Please provide exactly two files or directories.');
    return;
  }

  const [file1, file2] = files;
  const { format = 'unified', color = false } = options;

  if (fs.existsSync(file1) && fs.lstatSync(file1).isDirectory()) {
    if (!fs.existsSync(file2) || !fs.lstatSync(file2).isDirectory()) {
      console.error('The second argument must also be a directory.');
      return;
    }
    return compareDirectories(file1, file2, format, color);
  }

  if (!fs.existsSync(file1) || !fs.existsSync(file2)) {
    console.error('One or both of the provided files or directories do not exist.');
    return;
  }

  return compareFiles(file1, file2, format, color);
};

const compareFiles = (file1, file2, format, color) => {
  const { unified, context, sideBySide } = require('./formatters');

  const file1Content = fs.readFileSync(file1, 'utf8');
  const file2Content = fs.readFileSync(file2, 'utf8');

  switch (format) {
    case 'unified':
      console.log(unified(file1Content, file2Content));
      break;
    case 'context':
      console.log(context(file1Content, file2Content));
      break;
    case 'side-by-side':
      console.log(sideBySide(file1Content, file2Content));
      break;
    default:
      console.log(unified(file1Content, file2Content));
  }
};

const compareDirectories = (dir1, dir2, format, color) => {
  const { unified } = require('./formatters');

  const files1 = fs.readdirSync(dir1);
  const files2 = fs.readdirSync(dir2);

  const differences = files1.filter(file1 => !files2.includes(file1)).map(file1 => ({
    file1,
    file2: path.join(dir2, file1)
  })).concat(
    files2.filter(file2 => !files1.includes(file2)).map(file2 => ({
      file1: path.join(dir1, file2),
      file2
    }))
  );

  differences.forEach(diff => {
    const result = unified(
      fs.readFileSync(diff.file1, 'utf8'),
      fs.readFileSync(diff.file2 || '', 'utf8')
    );

    console.log(result);
  });
};

const formatters = require('./formatters');
module.exports = diff;