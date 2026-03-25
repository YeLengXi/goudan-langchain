# parseCSV.js

const { parse } = require('csv-parse/sync');

module.exports = {
  parseCSV: (filePath) => {
    const data = parse(filePath, {
      relax_column_count: true,
      skip_empty_lines: true
    });
    return data.map(row => row.map(cell => cell.replace(/""/g, '\"')));
  }
}
