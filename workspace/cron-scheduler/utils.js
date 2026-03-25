const fs = require('fs');

module.exports = {
  read_file: (params) => {
    return new Promise((resolve, reject) => {
      fs.readFile(params.file_path, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.toString());
        }
      });
    });
  },

  exec_command: (params) => {
    return new Promise((resolve, reject) => {
      require('child_process').exec(params.command, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }
}