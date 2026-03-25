// diff-tool
// A simple file and directory comparison tool similar to git diff.

const fs = require('fs');
const { exec } = require('child_process');

const diffFiles = (file1, file2, format, color) => {
  fs.readFile(file1, 'utf8', (err, data1) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.readFile(file2, 'utf8', (err, data2) => {
      if (err) {
        console.error(err);
        return;
      }

      const diff = generateDiff(data1, data2);
      const formattedDiff = formatDiff(diff, format);
      const coloredDiff = colorDiff(formattedDiff, color);
      console.log(coloredDiff);
    });
  });
};

const generateDiff = (data1, data2) => {
  // Implement diff generation logic here
  let diff = [];
  let i = 0;
  let j = 0;
  while (i < data1.length && j < data2.length) {
    if (data1[i] === data2[j]) {
      diff.push(data1[i]);
      i++;
      j++;
    } else if (data1[i] < data2[j]) {
      diff.push('-');
      diff.push(data1[i]);
      i++;
    } else {
      diff.push('+');
      diff.push(data2[j]);
      j++;
    }
  }
  while (i < data1.length) {
    diff.push('-');
    diff.push(data1[i]);
    i++;
  }
  while (j < data2.length) {
    diff.push('+');
    diff.push(data2[j]);
    j++;
  }
  return diff.join('');
};

const formatDiff = (diff, format) => {
  // Implement diff formatting logic here
  if (format === 'unified') {
    return diff;
  } else if (format === 'context') {
    // Implement context diff formatting
  } else if (format === 'side-by-side') {
    // Implement side-by-side diff formatting
  }
};

const colorDiff = (diff, color) => {
  // Implement color logic here
  if (color) {
    return diff.replace(/-/g, '\033[31m').replace(/\+/g, '\033[32m').replace(/\n/g, '\033[0m');
  }
  return diff;
};

const parseCLIArgs = () => {
  const args = process.argv.slice(2);
  const [file1, file2, ...options] = args;

  let format = 'unified';
  let color = false;

  options.forEach(option => {
    if (option.startsWith('--format=')) {
      format = option.split('=')[1];
    } else if (option === '--color') {
      color = true;
    }
  });

  return { file1, file2, format, color }; 
};

const main = () => {
  const { file1, file2, format, color } = parseCLIArgs();
  diffFiles(file1, file2, format, color);
};

main();