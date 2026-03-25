const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const exec = util.promisify(require('child_process').exec);
const listDirectory = util.promisify(fs.readdir);

const read_file = async (file_path) => {
    try {
        const data = await readFile(file_path, 'utf8');
        return data;
    } catch (err) {
        throw err;
    }
};

const write_file = async (file_path, content) => {
    try {
        await writeFile(file_path, content, 'utf8');
        return;
    } catch (err) {
        throw err;
    }
};

const exec_command = async (command) => {
    try {
        const { stdout, stderr } = await exec(command);
        return { stdout, stderr };
    } catch (err) {
        throw err;
    }
};

const list_directory = async (directory_path) => {
    try {
        const files = await listDirectory(directory_path);
        return files;
    } catch (err) {
        throw err;
    }
};