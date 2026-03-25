# exec_command.js

const { exec } = require('child_process');

module.exports = {
  exec_command: (command) => {
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