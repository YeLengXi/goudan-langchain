const fs = require('fs');
const path = require('path');

module.exports = {
    read_file: function(file_path) {
        return new Promise((resolve, reject) => {
            fs.readFile(file_path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },
    write_file: function(file_path, content) {
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
}