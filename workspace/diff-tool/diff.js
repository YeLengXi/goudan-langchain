const fs = require('fs');

const read_file = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.split('\n'));
            }
        });
    });
};

const write_file = async (filePath, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content.join('\n'), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const exec_command = async (command) => {
    return new Promise((resolve, reject) => {
        const { spawn } = require('child_process');
        const process = spawn(command);
        let data = '';
        process.stdout.on('data', (chunk) => {
            data += chunk;
        });
        process.on('close', () => {
            resolve(data.split('\n'));
        });
    });
};

const list_directory = async (directoryPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};