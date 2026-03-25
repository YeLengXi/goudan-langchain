const fs = require('fs');
const path = require('path');
const utils = require('./utils');

// Utility functions

function read_file(file_path) {
    return utils.read_file(file_path);
}

function write_file(file_path, content) {
    return utils.write_file(file_path, content);
}

function exec_command(command) {
    return utils.exec_command(command);
}

function list_directory(directory_path) {
    return utils.list_directory(directory_path);
}

// Main diff function

async function diff_files(file_path1, file_path2, format = 'unified', color = false) {
    const content1 = await read_file(file_path1);
    const content2 = await read_file(file_path2);

    const lines1 = content1.split('
');
    const lines2 = content2.split('
');

    let diff = '';
    let additions = 0;
    let deletions = 0;

    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';

        if (line1 !== line2) {
            additions += (line2 && !line1) ? 1 : 0;
            deletions += (line1 && !line2) ? 1 : 0;
            diff += `@@ -${i + 1},${lines1.length} +${i + 1},${lines2.length} @@
${line1}
${line2}
`;n            
        }
    }

    if (format === 'unified') {
        diff = `--- ${path.basename(file_path1)}
+++ ${path.basename(file_path2)}
${diff}`;
    } else if (format === 'context') {
        // Implement context diff
    } else if (format === 'side-by-side') {
        // Implement side-by-side diff
    }

    if (color) {
        diff = diff.replace(/^-/g, '\033[31m').replace(/\+/g, '\033[32m').replace(/-/g, '\033[31m').replace(/@/g, '\033[0m').replace(/@@/g, '\033[0m').replace(/\n/g, '\033[0m');
    }

    return {
        diff,
        additions,
        deletions
    };
}

// CLI interface

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log('Usage: node diff.js <file1> <file2> [--format <format>] [--color]');
        return;
    }

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

    const result = await diff_files(file1, file2, format, color);

    console.log(result.diff);
    console.log(`Changes: ${result.additions} additions, ${result.deletions} deletions`);
}

main();