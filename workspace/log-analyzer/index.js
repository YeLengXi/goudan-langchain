const fs = require('fs');
const path = require('path');

// 读取文件内容
async function read_file(file_path) {
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

// 写入文件内容
async function write_file(file_path, content) {
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

// 执行命令行命令
async function exec_command(command) {
  return new Promise((resolve, reject) => {
    require('child_process').exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({stdout, stderr});
      }
    });
  });
}

// 列出目录内容
async function list_directory(directory_path) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory_path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}
