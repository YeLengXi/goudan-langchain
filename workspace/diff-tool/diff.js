const fs = require('fs');
const path = require('path');

const diffFiles = (file1, file2, format = 'unified', color = false) => {
  const content1 = fs.readFileSync(file1, 'utf8');
  const content2 = fs.readFileSync(file2, 'utf8');

  const lines1 = content1.split('
');
  const lines2 = content2.split('
');

  // 比较文件内容
  const differences = compareLines(lines1, lines2);

  // 根据格式输出结果
  if (format === 'unified') {
    return unifiedDiff(differences, color);
  } else if (format === 'side-by-side') {
    return sideBySideDiff(differences, color);
  } else if (format === 'context') {
    return contextDiff(differences, color);
  }

  return differences;
};

const compareLines = (lines1, lines2) => {
  // 比较每一行并记录差异
  const differences = [];
  let i = 0;
  let j = 0;

  while (i < lines1.length || j < lines2.length) {
    if (i < lines1.length && j < lines2.length && lines1[i] === lines2[j]) {
      i++;
      j++;
    } else if (i < lines1.length && j < lines2.length && lines1[i] !== lines2[j]) {
      differences.push({ line1: lines1[i], line2: lines2[j] });
      i++;
      j++;
    } else if (i < lines1.length) {
      differences.push({ line1: lines1[i], line2: null });
      i++;
    } else if (j < lines2.length) {
      differences.push({ line1: null, line2: lines2[j] });
      j++;
    }
  }

  return differences;
};

const unifiedDiff = (differences, color) => {
  let output = '--- ' + path.basename(differences[0].line1) + '
+++ ' + path.basename(differences[0].line2) + '
';

  differences.forEach(diff => {
    if (diff.line1) {
      output += '- ' + diff.line1 + '
';
    }
    if (diff.line2) {
      output += '+ ' + diff.line2 + '
';
    }
  });

  return output;
};

const sideBySideDiff = (differences, color) => {
  let output = '';

  differences.forEach(diff => {
    if (diff.line1) {
      output += diff.line1 + ' | ' + diff.line2 + '
';
    } else {
      output += ' | ' + diff.line2 + '
';
    }
  });

  return output;
};

const contextDiff = (differences, color) => {
  let output = '';

  differences.forEach(diff => {
    output += ' ' + diff.line1 + '
';
  });

  return output;
};

module.exports = { diffFiles };