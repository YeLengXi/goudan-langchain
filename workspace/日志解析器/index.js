const read_file = require('fs').readFile;

module.exports = {
  read_file: (file_path) => {
    return new Promise((resolve, reject) => {
      read_file(file_path, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.toString());
        }
      });
    });
  },
};