const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const statAsync = promisify(fs.stat);

const listDirectoryAsync = async (directoryPath) => {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  return entries.map(entry => {
    const fullPath = path.join(directoryPath, entry.name);
    return {
      name: entry.name,
      path: fullPath,
      isDirectory: entry.isDirectory(),
      stat: await statAsync(fullPath)
    };
  });
};

const compareFilesAsync = async (filePath1, filePath2) => {
  const content1 = await readFileAsync(filePath1, 'utf8');
  const content2 = await readFileAsync(filePath2, 'utf8');

  const lines1 = content1.split('
');
  const lines2 = content2.split('
');

  let additions = 0;
  let deletions = 0;
  let modifications = 0;

  const diff = lines1.map((line, index) => {
    const line2 = lines2[index] || '';
    if (line !== line2) {
      modifications++;
    }
    return {
      line1: line,
      line2: line2
    };
  }).filter(diff => diff.line1 || diff.line2);

  return {
    diff,
    additions,
    deletions,
    modifications
  };
};

const formatDiffUnified = (diff) => {
  return diff.map(d => {
    if (d.line1 && d.line2) {
      return `--- ${d.line1}
+++ ${d.line2}`;
    } else if (d.line1) {
      return `+ ${d.line1}`;
    } else if (d.line2) {
      return `- ${d.line2}`;
    }
  }).join('
');
};

const formatDiffContext = (diff, contextLines = 3) => {
  // Implementation for context diff
};

const formatDiffSideBySide = (diff) => {
  return diff.map(d => {
    if (d.line1 && d.line2) {
      return `--- ${d.line1}
+++ ${d.line2}`;
    } else if (d.line1) {
      return `+ ${d.line1}`;
    } else if (d.line2) {
      return `- ${d.line2}`;
    }
  }).join('
');
};

const compareDirectoriesAsync = async (dirPath1, dirPath2) => {
  const entries1 = await listDirectoryAsync(dirPath1);
  const entries2 = await listDirectoryAsync(dirPath2);

  // Implementation for directory comparison
};

const printDiff = async (filePath1, filePath2, format = 'unified', color = false) => {
  const diffResult = await compareFilesAsync(filePath1, filePath2);

  let formattedDiff = ''; switch (format) {
    case 'context':
      formattedDiff = formatDiffContext(diffResult.diff);
      break;
    case 'side-by-side':
      formattedDiff = formatDiffSideBySide(diffResult.diff);
      break;
    default:
      formattedDiff = formatDiffUnified(diffResult.diff);
  }

  if (color) {
    formattedDiff = formattedDiff.replace(/^- /g, '\x1b[31m- ');
    formattedDiff = formattedDiff.replace(/\+ /g, '\x1b[32m+ ');
    formattedDiff = formattedDiff.replace(/^- /g, '\x1b[31m- ');
    formattedDiff = formattedDiff.replace(/\+ /g, '\x1b[32m+ ');
  }

  console.log(formattedDiff);
  console.log(`Changes: ${diffResult.additions} additions, ${diffResult.deletions} deletions`);
};

const main = async () => {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node diff.js <file1> <file2> [--format <format>] [--color]');
    return;
  }

  const [filePath1, filePath2, ...options] = args;

  let format = 'unified';
  let color = false;

  options.forEach(option => {
    if (option.startsWith('--format=')) {
      format = option.split('=')[1];
    } else if (option === '--color') {
      color = true;
    }
  });

  if (path.isAbsolute(filePath1) && path.isAbsolute(filePath2)) {
    if (path.basename(filePath1).isDirectory() || path.basename(filePath2).isDirectory()) {
      await compareDirectoriesAsync(filePath1, filePath2, format, color);
    } else {
      await printDiff(filePath1, filePath2, format, color);
    }
  } else {
    console.log('Invalid file paths');
  }
};

main();