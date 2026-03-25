# list_directory

const fs = require('fs');
const path = require('path');

module.exports = {
  listDirectory: (directoryPath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });
  }
};