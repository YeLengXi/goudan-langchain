# write_file

const fs = require('fs');
const path = require('path');

module.exports = {
  writeFile: (filePath, content) => {
    return new Promise((resolve, reject) => {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
};