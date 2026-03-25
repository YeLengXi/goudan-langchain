# sort.js

const parseCSV = require('./parseCSV');
const generateCSV = require('./generateCSV');
const fs = require('fs');
const path = require('path');

module.exports = {
  sortCsvByColumn: (filePath, column) => {
    const data = parseCSV.parseCSV(filePath);
    data.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    return data;
  }
}
