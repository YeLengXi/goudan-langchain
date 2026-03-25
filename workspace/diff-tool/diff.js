const fs = require('fs');
const path = require('path');

const FILE_MODE = 'file';
const DIR_MODE = 'dir';

function readFile(filePath) {
  return fs.promises.readFile(filePath, 'utf8');
}

function listDirectory(directoryPath) {
  return fs.promises.readdir(directoryPath, { withFileTypes: true });
}

function compareFiles(file1, file2) {
  return Promise.all([readFile(file1), readFile(file2)]).then(([content1, content2]) => {
    let diff = [];
    let additions = 0;
    let deletions = 0;

    const lines1 = content1.split('
');
    const lines2 = content2.split('
');

    let minLength = Math.min(lines1.length, lines2.length);
    for (let i = 0; i < minLength; i++) {
      if (lines1[i] !== lines2[i]) {
        diff.push(`@@ -${i + 1},${lines1.length - i} +${i + 1},${lines2.length - i} @@
${lines1[i]}
${lines2[i]}
`);
        deletions++;
        additions++;
      }
    }

    for (let i = minLength; i < lines1.length; i++) {
      diff.push(`@@ -${i + 1},${lines1.length - i} +0,0 @@
${lines1[i]}
`);
      deletions++;
    }

    for (let i = minLength; i < lines2.length; i++) {
      diff.push(`@@ -0,0 +${i + 1},${lines2.length - i} @@
${lines2[i]}
`);
      additions++;
    }

    return {
      diff,
      additions,
      deletions
    };
  });
}

function compareDirectories(dir1, dir2) {
  return Promise.all([listDirectory(dir1), listDirectory(dir2)]).then(([files1, files2]) => {
    let diff = [];
    let additions = 0;
    let deletions = 0;

    files1.forEach(file1 => {
      const filePath1 = path.join(dir1, file1.name);
      const isFile1 = file1.isFile();

      files2.forEach(file2 => {
        const filePath2 = path.join(dir2, file2.name);
        const isFile2 = file2.isFile();

        if (isFile1 && isFile2) {
          const { diff: fileDiff, additions: fileAdditions, deletions: fileDeletions } = compareFiles(filePath1, filePath2);
          diff.push(...fileDiff);
          additions += fileAdditions;
          deletions += fileDeletions;
        } else if (isFile1) {
          diff.push(`@@ -0,0 +1,1 @@
${file1.name}
`);
          additions++;
        } else if (isFile2) {
          diff.push(`@@ -0,0 +1,1 @@
${file2.name}
`);
          deletions++;
        }
      });
    });

    return {
      diff,
      additions,
      deletions
    };
  });
}