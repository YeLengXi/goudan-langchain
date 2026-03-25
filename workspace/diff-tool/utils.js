const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Utility functions

function read_file(file_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function write_file(file_path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file_path, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function exec_command(command) {
    return new Promise((resolve, reject) => {
        const { stdout, stderr } = require('child_process').execSync(command);
        resolve({ stdout, stderr });
    });
}

function list_directory(directory_path) {
    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(directory_path);
            resolve(files);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { read_file, write_file, exec_command, list_directory };