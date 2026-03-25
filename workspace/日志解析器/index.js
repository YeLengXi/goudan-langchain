const fs = require('fs');

function read_file(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

module.exports = read_file;