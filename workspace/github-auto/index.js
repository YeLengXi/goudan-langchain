const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');
const path = require('path');

const GITHUB_API_URL = 'https://api.github.com';
const README_TEMPLATE_PATH = path.join(__dirname, '../templates/README.md');
const GITIGNORE_TEMPLATE_PATHS = {
  'default': path.join(__dirname, '../templates/gitignore/default.gitignore'),
  'nodejs': path.join(__dirname, '../templates/gitignore/nodejs.gitignore')
};
const LICENSE_PATHS = {
  'mit': path.join(__dirname, '../templates/LICENSE-MIT.txt'),
  'apache': path.join(__dirname, '../templates/LICENSE-APACHE.txt'),
  'gpl': path.join(__dirname, '../templates/LICENSE-GPL.txt')
};

const read_file = async (filePath) => {
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

const write_file = async (filePath, content) => {
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

const exec_command = async (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

module.exports = {
  GITHUB_API_URL,
  README_TEMPLATE_PATH,
  GITIGNORE_TEMPLATE_PATHS,
  LICENSE_PATHS,
  read_file,
  write_file,
  exec_command
};