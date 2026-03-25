const fs = require('fs');
const path = require('path');
const { exec_command } = require('../utils/utils');

function read_file(file_path) {
  return fs.readFileSync(file_path, 'utf8').split('
');
}

function write_file(file_path, content) {
  fs.writeFileSync(file_path, content.join('
'), 'utf8');
}

function diff_files(file_path1, file_path2) {
  const lines1 = read_file(file_path1);
  const lines2 = read_file(file_path2);

  let diff = [];
  let additions = 0;
  let deletions = 0;

  for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
    const line1 = lines1[i] || '';
    const line2 = lines2[i] || '';

    if (line1 !== line2) {
      diff.push(`--- ${path.basename(file_path1)}
+++ ${path.basename(file_path2)}
@@ -${i + 1},${lines1.length} +${i + 1},${lines2.length} @@
${line1}
${line2}`);
      additions += (line2 && !line1) ? 1 : 0;
      deletions += (line1 && !line2) ? 1 : 0;
    }
  }

  return {
    diff,
    additions,
    deletions
  };
}

function diff_directories(dir_path1, dir_path2) {
  const files1 = list_directory(dir_path1);
  const files2 = list_directory(dir_path2);

  let diff = [];
  let additions = 0;
  let deletions = 0;

  files1.forEach(file => {
    if (!files2.includes(file)) {
      diff.push(`--- ${dir_path1}/${file}
+++ ${dir_path2}/${file}
@@ -0,0 +1 @@
+${file}`);
      additions += 1;
    }
  });

  files2.forEach(file => {
    if (!files1.includes(file)) {
      diff.push(`--- ${dir_path2}/${file}
+++ ${dir_path2}/${file}
@@ -0,0 +1 @@
-${file}
${file}
    
  });

  return {
    diff,
    additions,
    deletions
  };
}

function format_diff(diff, format) {
  if (format === 'unified') {
    return diff.join('
');
  } else if (format === 'context') {
    // Implement context diff
  } else if (format === 'side-by-side') {
    // Implement side-by-side diff
  } else {
    return diff.join('
');
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node diff.js <file1> <file2> [--format <format>] [--color]');
    return;
  }

  const [file1, file2] = args.slice(0, 2);
  const format = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'unified';
  const color = args.includes('--color');

  if (fs.existsSync(file1) && fs.existsSync(file2)) {
    if (fs.statSync(file1).isFile() && fs.statSync(file2).isFile()) {
      const { diff, additions, deletions } = diff_files(file1, file2);
      const formatted_diff = format_diff(diff, format);
      console.log(formatted_diff);
      console.log(`Changes: ${additions} additions, ${deletions} deletions`);
    } else if (fs.statSync(file1).isDirectory() && fs.statSync(file2).isDirectory()) {
      const { diff, additions, deletions } = diff_directories(file1, file2);
      const formatted_diff = format_diff(diff, format);
      console.log(formatted_diff);
      console.log(`Changes: ${additions} additions, ${deletions} deletions`);
    } else {
      console.log('Invalid file or directory');
    }
  } else {
    console.log('File or directory does not exist');
  }
}

main();
