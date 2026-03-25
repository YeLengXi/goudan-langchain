const fs = require('fs');
const { program } = require('commander');

const read_file = (file_path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const write_file = (file_path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file_path, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const exec_command = (command) => {
    return new Promise((resolve, reject) => {
        require('child_process').exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
};

const list_directory = (directory_path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directory_path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};

const format = (json, indent) => {
    return JSON.stringify(JSON.parse(json), null, indent);
};

const sort = (json, key) => {
    const data = JSON.parse(json);
    data.sort((a, b) => {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    });
    return JSON.stringify(data, null, 2);
};

const filter = (json, condition) => {
    const data = JSON.parse(json);
    return JSON.stringify(data.filter(item => eval(condition)), null, 2);
};

const merge = (json1, json2) => {
    return JSON.stringify(JSON.parse(json1).concat(JSON.parse(json2)), null, 2);
};

program
    .version('0.1.0')
    .command('format <file>')
    .description('Format JSON file')
    .action(async (file) => {
        try {
            const content = await read_file(file);
            const formatted = format(content, 2);
            await write_file(file, formatted);
            console.log('Formatted JSON file successfully.');
        } catch (err) {
            console.error('Error formatting JSON file:', err);
        }
    })
    .option('--indent <number>', 'Indentation level');

program
    .command('sort <file>')
    .description('Sort JSON file by key')
    .option('--key <key>', 'Key to sort by')
    .action(async (file) => {
        try {
            const content = await read_file(file);
            const sorted = sort(content, program.key);
            await write_file(file, sorted);
            console.log('Sorted JSON file successfully.');
        } catch (err) {
            console.error('Error sorting JSON file:', err);
        }
    });

program
    .command('filter <file>')
    .description('Filter JSON file')
    .option('--condition <condition>', 'Condition to filter by')
    .action(async (file) => {
        try {
            const content = await read_file(file);
            const filtered = filter(content, program.condition);
            await write_file(file, filtered);
            console.log('Filtered JSON file successfully.');
        } catch (err) {
            console.error('Error filtering JSON file:', err);
        }
    });

program
    .command('merge <file1> <file2>')
    .description('Merge two JSON files')
    .action(async (file1, file2) => {
        try {
            const content1 = await read_file(file1);
            const content2 = await read_file(file2);
            const merged = merge(content1, content2);
            await write_file(file1, merged);
            console.log('Merged JSON files successfully.');
        } catch (err) {
            console.error('Error merging JSON files:', err);
        }
    });

program.parse(process.argv);
