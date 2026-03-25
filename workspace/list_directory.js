const fs = require('fs');
const path = require('path');

module.exports = {
    list_directory: function(directory_path) {
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
}