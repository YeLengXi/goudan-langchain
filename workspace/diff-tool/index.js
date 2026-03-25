const fs = require('fs');
const path = require('path');

// Function to read file content
function read_file(file_path) {
    return fs.promises.readFile(file_path, 'utf8').then(data => data.split('
'));
}

// Function to write file content
function write_file(file_path, content) {
    return fs.promises.writeFile(file_path, content.join('
'));
}

// Function to execute command line command
function exec_command(command) {
    return new Promise((resolve, reject) => {
        const { spawn } = require('child_process');
        const process = spawn('cmd', ['/c', command]);
        let data = '';
        process.stdout.on('data', chunk => data += chunk);
        process.stderr.on('data', chunk => data += chunk);
        process.on('close', () => resolve(data.trim()));
    });
}

// Function to list directory content
function list_directory(directory_path) {
    return fs.promises.readdir(directory_path, { withFileTypes: true });
}

// Main function to compare files or directories
async function diff(path1, path2, format = 'unified', color = false) {
    // Check if paths are files or directories
    const stats1 = fs.statSync(path1);
    const stats2 = fs.statSync(path2);
    let content1 = [];
    let content2 = [];

    if (stats1.isFile() && stats2.isFile()) {
        // Read file contents
        content1 = await read_file(path1);
        content2 = await read_file(path2);
    } else if (stats1.isDirectory() && stats2.isDirectory()) {
        // List directory contents
        content1 = await list_directory(path1);
        content2 = await list_directory(path2);
    } else {
        throw new Error('Paths must be files or directories');
    }

    // Compare contents
    const differences = compare_contents(content1, content2);

    // Format output
    let output = '';
    if (format === 'unified') {
        output = format_unified(differences);
    } else if (format === 'context') {
        output = format_context(differences);
    } else if (format === 'side-by-side') {
        output = format_side_by_side(differences, color);
    } else {
        throw new Error('Unsupported format');
    }

    // Write output to file
    await write_file('output.txt', output.split('
'));

    // Return output
    return output;
}

// Function to compare file contents line by line
function compare_contents(content1, content2) {
    let differences = [];
    let index1 = 0;
    let index2 = 0;

    while (index1 < content1.length || index2 < content2.length) {
        if (index1 < content1.length && index2 < content2.length) {
            if (content1[index1] === content2[index2]) {
                index1++;
                index2++;
            } else if (content1[index1] < content2[index2]) {
                differences.push({ type: 'added', line: content2[index2] });
                index2++;
            } else {
                differences.push({ type: 'deleted', line: content1[index1] });
                index1++;
            }
        } else if (index1 < content1.length) {
            differences.push({ type: 'deleted', line: content1[index1] });
            index1++;
        } else if (index2 < content2.length) {
            differences.push({ type: 'added', line: content2[index2] });
            index2++;
        }
    }

    return differences;
}

// Function to format unified diff output
function format_unified(differences) {
    let output = '';
    let index = 0;

    differences.forEach(diff => {
        if (diff.type === 'added') {
            output += '+++' + diff.line + '
';
        } else if (diff.type === 'deleted') {
            output += '---' + diff.line + '
';
        }
        index++;
    });

    return output;
}

// Function to format context diff output
function format_context(differences) {
    let output = '';
    let index = 0;

    differences.forEach(diff => {
        if (diff.type === 'added') {
            output += '+ ' + diff.line + '
';
        } else if (diff.type === 'deleted') {
            output += '- ' + diff.line + '
';
        }
        index++;
    });

    return output;
}

// Function to format side-by-side diff output
function format_side_by_side(differences, color) {
    let output = '';
    let index = 0;

    differences.forEach(diff => {
        if (diff.type === 'added') {
            if (color) {
                output += '\033[32m' + diff.line + '\033[0m
            } else {
                output += '+++' + diff.line + '
';
            }
        } else if (diff.type === 'deleted') {
            if (color) {
                output += '\033[31m' + diff.line + '\033[0m
            } else {
                output += '---' + diff.line + '
';
            }
        }
        index++;
    });

    return output;
}

// CLI interface
const args = process.argv.slice(2);

if (args.length < 2) {
    console.log('Usage: node diff.js <path1> <path2> [--format <format>] [--color]');
} else {
    const [path1, path2] = args;
    const format = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'unified';
    const color = args.includes('--color');
    diff(path1, path2, format, color).then(output => {
        console.log(output);
    }).catch(error => {
        console.error(error.message);
    });
}
