const fs = require('fs');
const path = require('path');

const diffFiles = (file1, file2, format = 'unified', color = false) => {
  const content1 = fs.readFileSync(file1, 'utf8');
  const content2 = fs.readFileSync(file2, 'utf8');

  const differences = computeDifferences(content1, content2);
  const formattedDiff = formatDifferences(differences, format, color);

  console.log(formattedDiff);
};

const computeDifferences = (content1, content2) => {
  const lines1 = content1.split('
');
  const lines2 = content2.split('
');

  let differences = [];
  let i = 0;
  let j = 0;

  while (i < lines1.length || j < lines2.length) {
    if (i < lines1.length && j < lines2.length && lines1[i] === lines2[j]) {
      i++;
      j++;
    } else if (i < lines1.length && lines1[i] !== lines2[j]) {
      differences.push({ type: 'deleted', line: lines1[i] });
      i++;
    } else if (j < lines2.length && lines2[j] !== lines1[i]) {
      differences.push({ type: 'added', line: lines2[j] });
      j++;
    }
  }

  return differences;
};

const formatDifferences = (differences, format, color) => {
  if (format === 'unified') {
    return formatUnified(differences, color);
  } else if (format === 'context') {
    return formatContext(differences, color);
  } else if (format === 'side-by-side') {
    return formatSideBySide(differences, color);
  }
};

const formatUnified = (differences, color) => {
  let result = "--- ${file1}
+++ ${file2}
";
  differences.forEach(diff => {
    if (diff.type === 'deleted') {
      result += "- ${diff.line}
";
    } else if (diff.type === 'added') {
      result += "+ ${diff.line}
";
    }
  });
  return result;
};

const formatContext = (differences, color) => {
  // Implement context format
};

const formatSideBySide = (differences, color) => {
  // Implement side-by-side format
};

module.exports = { diffFiles };