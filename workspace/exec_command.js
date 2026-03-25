const fs = require('fs');
const path = require('path');

module.exports = {
    exec_command: function(command) {
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
}