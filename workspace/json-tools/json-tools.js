const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const format = async (filePath, indent) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    const formattedData = JSON.stringify(parsedData, null, indent);
    await writeFile(filePath, formattedData, 'utf8');
    console.log('JSON formatted successfully.');
  } catch (error) {
    console.error('Error formatting JSON:', error);
  }
};

const sort = async (filePath, key) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    const sortedData = JSON.stringify(parsedData, null, 2);
    await writeFile(filePath, sortedData, 'utf8');
    console.log('JSON sorted successfully.');
  } catch (error) {
    console.error('Error sorting JSON:', error);
  }
};

const filter = async (filePath, condition) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    const filteredData = parsedData.filter(item => eval(condition));
    const filteredDataString = JSON.stringify(filteredData, null, 2);
    await writeFile(filePath, filteredDataString, 'utf8');
    console.log('JSON filtered successfully.');
  } catch (error) {
    console.error('Error filtering JSON:', error);
  }
};

const merge = async (filePath1, filePath2, outputFilePath) => {
  try {
    const data1 = await readFile(filePath1, 'utf8');
    const data2 = await readFile(filePath2, 'utf8');
    const parsedData1 = JSON.parse(data1);
    const parsedData2 = JSON.parse(data2);
    const mergedData = { ...parsedData1, ...parsedData2 };
    const mergedDataString = JSON.stringify(mergedData, null, 2);
    await writeFile(outputFilePath, mergedDataString, 'utf8');
    console.log('JSON merged successfully.');
  } catch (error) {
    console.error('Error merging JSON:', error);
  }
};

module.exports = {
  format,
  sort,
  filter,
  merge
}