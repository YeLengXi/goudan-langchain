# filter.js

const parseCSV = require('./parseCSV');
const generateCSV = require('./generateCSV');
const fs = require('fs');
const path = require('path');

module.exports = {
  filterCsvByColumn: (filePath, column, value) => {
    const data = parseCSV.parseCSV(filePath);
    return data.filter(row => row[column] === value);
  },
  filterCsvByRow: (filePath, rowIndex) => {
    const data = parseCSV.parseCSV(filePath);
    return data.slice(rowIndex + 1);
  }
}
