const fs = require('fs');
const util = require('util');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const stat = promisify(fs.stat);

const jsonTools = {
  format: async (filePath, indent = 2) => {
    try {
      const data = await readFile(filePath, 'utf8');
      const parsedData = JSON.parse(data);
      const formattedData = JSON.stringify(parsedData, null, indent);
      return formattedData;
    } catch (error) {
      throw new Error('Invalid JSON or file not found');
    }
  },

  sort: async (filePath, key) => {
    try {
      const data = await readFile(filePath, 'utf8');
      const parsedData = JSON.parse(data);
      parsedData.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      return JSON.stringify(parsedData, null, 2);
    } catch (error) {
      throw new Error('Invalid JSON or file not found');
    }
  },

  filter: async (filePath, condition) => {
    try {
      const data = await readFile(filePath, 'utf8');
      const parsedData = JSON.parse(data);
      return JSON.stringify(parsedData.filter(item => eval(condition)), null, 2);
    } catch (error) {
      throw new Error('Invalid JSON or file not found');
    }
  },

  merge: async (filePath1, filePath2) => {
    try {
      const data1 = await readFile(filePath1, 'utf8');
      const data2 = await readFile(filePath2, 'utf8');
      const parsedData1 = JSON.parse(data1);
      const parsedData2 = JSON.parse(data2);
      return JSON.stringify(Object.assign({}, parsedData1, parsedData2), null, 2);
    } catch (error) {
      throw new Error('Invalid JSON or file not found');
    }
  }
};

module.exports = jsonTools;