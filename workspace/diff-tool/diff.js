const fs = require('fs');
const path = require('path');

// Helper function to read file content
const read_file = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

// Helper function to write file content
const write_file = (filePath, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Helper function to compare two lines
const compare_lines = (line1, line2) => {
    if (line1 === line2) {
        return 'identical';
    } else if (line1 === '' && line2 !== '') {
        return 'inserted';
    } else if (line1 !== '' && line2 === '') {
        return 'deleted';
    } else {
        return 'modified';
    }
};

// Function to generate unified diff format
const generate_unified_diff = (oldContent, newContent) => {
    const lines = oldContent.split('
').concat(newContent.split('
'))
        .filter((line, index, self) => self.indexOf(line) === index);

    let diff = "--- ${oldContent.split(' ')[0]}
+++ ${newContent.split(' ')[0]}
";

    lines.forEach((line, index) => {
        if (index % 3 === 0) {
            diff += "@@ -${index} +${index + lines.length} @@
";
        }
        diff += line + '\n';
    });

    return diff;
};

// Function to compare files
const compare_files = async (filePath1, filePath2) => {
    const oldContent = await read_file(filePath1);
    const newContent = await read_file(filePath2);

    const unifiedDiff = generate_unified_diff(oldContent, newContent);
    return unifiedDiff;
};

// Function to run CLI interface
const run_cli = () => {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log('Usage: node diff.js <file1> <file2> [--format <format>] [--color]');
        return;
    }

    const filePath1 = args[0];
    const filePath2 = args[1];
    const format = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'unified';
    const color = args.includes('--color');

    const result = compare_files(filePath1, filePath2);

    if (color) {
        console.log(result);
    } else {
        console.log(result.replace(/\x1b\[([0-9;][0-9;]*[mGK]?)\]/g, ''));
    }
};

// Run the CLI interface
run_cli();