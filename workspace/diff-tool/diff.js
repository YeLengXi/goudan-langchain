const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Utility functions
function read_file(file_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

function write_file(file_path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file_path, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

function list_directory(directory_path) {
    return fs.readdir(directory_path, (err, files) => {
        if (err) {
            return;
        }
        return files;
    });
}

function exec_command(command) {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve({ stdout, stderr });
        });
    });
}

// Main function
async function main() {
    const args = process.argv.slice(2);
    const [file1, file2, ...options] = args;

    if (!file1 || !file2) {
        console.log('Usage: diff.js <file1> <file2> [--format <format>] [--color]');
        process.exit(1);
    }

    let format = 'unified';
    let color = false;

    for (const option of options) {
        if (option.startsWith('--format=')) {
            format = option.split('=')[1];
        } else if (option === '--color') {
            color = true;
        }
    }

    const content1 = await read_file(file1);
    const content2 = await read_file(file2);

    const diff = compute_diff(content1, content2, format, color);
    console.log(diff);
}

function compute_diff(content1, content2, format, color) {
    const lines1 = content1.split('\n');
    const lines2 = content2.split('\n');
    let diffOutput = '';

    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';

        if (line1 !== line2) {
            diffOutput += '- ' + line1 + '\n+ ' + line2 + '\n';
        }
    }

    return diffOutput;
}

main();
