const fs = require('fs');
const path = require('path');
const readline = require('readline');

const { format, sort, filter, merge } = require('./index');

const readJSONFromFile = filePath => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Invalid JSON file');
  }
};

const writeJSONToFile = (filePath, json) => {
  try {
    const data = JSON.stringify(json, null, 2);
    fs.writeFileSync(filePath, data, 'utf8');
  } catch (error) {
    throw new Error('Error writing JSON to file');
  }
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node json-tools.js <command> <json-file> [options]');
    process.exit(1);
  }

  const command = args[0];
  const filePath = args[1];
  let options = args.slice(2);

  switch (command) {
    case 'format':
      try {
        const json = readJSONFromFile(filePath);
        writeJSONToFile(filePath, format(json, 2));
        console.log('JSON formatted successfully.');
      } catch (error) {
        console.error(error.message);
      }
      break;
    case 'sort':
      try {
        const json = readJSONFromFile(filePath);
        const key = options.find(option => option.startsWith('--key '))?.split('--key ')[1];
        if (!key) {
          console.error('Usage: node json-tools.js sort <json-file> --key <key-name>');
          process.exit(1);
        }
        writeJSONToFile(filePath, sort(json, key));
        console.log('JSON sorted successfully.');
      } catch (error) {
        console.error(error.message);
      }
      break;
    case 'filter':
      try {
        const json = readJSONFromFile(filePath);
        const condition = options.find(option => option.startsWith('--condition '))?.split('--condition ')[1];
        if (!condition) {
          console.error('Usage: node json-tools.js filter <json-file> --condition <condition-expression>');
          process.exit(1);
        }
        writeJSONToFile(filePath, filter(json, condition));
        console.log('JSON filtered successfully.');
      } catch (error) {
        console.error(error.message);
      }
      break;
    case 'merge':
      try {
        const [filePath1, filePath2] = args.slice(2);
        const json1 = readJSONFromFile(filePath1);
        const json2 = readJSONFromFile(filePath2);
        writeJSONToFile(filePath1, merge(json1, json2));
        console.log('JSON merged successfully.');
      } catch (error) {
        console.error(error.message);
      }
      break;
    default:
      console.error('Unknown command');
  }
};

module.exports = main;