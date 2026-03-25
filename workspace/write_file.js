# write_file.js

const fs = require('fs');
const path = require('path');

module.exports = {
  write_file: (file_path, content) => {
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
};