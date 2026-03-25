const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdirSync = fs.mkdirSync;
const existsSync = fs.existsSync;

const jsonTools = {
  async format(filePath) {
    try {
      const data = await readFile(filePath, 'utf8');
      const json = JSON.parse(data);
      const formattedJson = JSON.stringify(json, null, 2);
      await writeFile(filePath, formattedJson, 'utf8');
      return formattedJson;
    } catch (error) {
      throw new Error('Invalid JSON or file read error');
    }
  },

  async sort(filePath, key) {
    try {
      const data = await readFile(filePath, 'utf8');
      const json = JSON.parse(data);
      json.sort((a, b) => a[key].localeCompare(b[key]));
      const sortedJson = JSON.stringify(json, null, 2);
      await writeFile(filePath, sortedJson, 'utf8');
      return sortedJson;
    } catch (error) {
      throw new Error('Invalid JSON or file read error');
    }
  },

  async filter(filePath, condition) {
    try {
      const data = await readFile(filePath, 'utf8');
      const json = JSON.parse(data);
      const filteredJson = json.filter(item => eval(condition));
      const filteredJsonString = JSON.stringify(filteredJson, null, 2);
      await writeFile(filePath, filteredJsonString, 'utf8');
      return filteredJsonString;
    } catch (error) {
      throw new Error('Invalid JSON or file read error');
    }
  },

  async merge(filePath1, filePath2) {
    try {
      const data1 = await readFile(filePath1, 'utf8');
      const data2 = await readFile(filePath2, 'utf8');
      const json1 = JSON.parse(data1);
      const json2 = JSON.parse(data2);
      const mergedJson = { ...json1, ...json2 };
      const mergedJsonString = JSON.stringify(mergedJson, null, 2);
      await writeFile(filePath1, mergedJsonString, 'utf8');
      return mergedJsonString;
    } catch (error) {
      throw new Error('Invalid JSON or file read error');
    }
  }
};

module.exports = jsonTools;