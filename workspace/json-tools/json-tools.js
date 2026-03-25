const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const JSON.stringify = util.promisify(JSON.stringify);
const JSON.parse = util.promisify(JSON.parse);

const format = async (filePath, indent) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    const formatted = JSON.stringify(json, null, indent);
    await writeFile(filePath, formatted, 'utf8');
    console.log('JSON formatted successfully.');
  } catch (error) {
    console.error('Error formatting JSON:', error);
  }
};

const sort = async (filePath, key) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    json.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    const sorted = JSON.stringify(json, null, 2);
    await writeFile(filePath, sorted, 'utf8');
    console.log('JSON sorted successfully.');
  } catch (error) {
    console.error('Error sorting JSON:', error);
  }
};

const filter = async (filePath, condition) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const json = JSON.parse(data);
    const filtered = json.filter(item => {
      return condition(item);
    });
    const filteredJson = JSON.stringify(filtered, null, 2);
    await writeFile(filePath, filteredJson, 'utf8');
    console.log('JSON filtered successfully.');
  } catch (error) {
    console.error('Error filtering JSON:', error);
  }
};

const merge = async (filePath1, filePath2, outputFilePath) => {
  try {
    const data1 = await readFile(filePath1, 'utf8');
    const data2 = await readFile(filePath2, 'utf8');
    const json1 = JSON.parse(data1);
    const json2 = JSON.parse(data2);
    const merged = { ...json1, ...json2 };
    const mergedJson = JSON.stringify(merged, null, 2);
    await writeFile(outputFilePath, mergedJson, 'utf8');
    console.log('JSON merged successfully.');
  } catch (error) {
    console.error('Error merging JSON:', error);
  }
};

module.exports = { format, sort, filter, merge };