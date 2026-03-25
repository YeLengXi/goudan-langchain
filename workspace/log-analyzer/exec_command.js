# exec_command

const { exec } = require('child_process');

module.exports = {
  execCommand: (command) => {
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }
};