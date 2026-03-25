const fs = require('fs');
const { parse } = require('json2csv');
const { JSDOM } = require('jsdom');
const { DOMParser } = require('xmldom');
const { promisify } = require('util');
const read_file = promisify(fs.readFile);
const write_file = promisify(fs.writeFile);
const exec_command = require('./exec_command');

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];
const file_path = args[1];
const options = args.slice(2);

// Read JSON from file
async function readJsonFile(filePath) {
  try {
    const data = await read_file(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

// Write JSON to file
async function writeJsonFile(filePath, data) {
  try {
    await write_file(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error('Failed to write JSON');
  }
}

// Format JSON
async function format(json) {
  return JSON.stringify(json, null, 2);
}

// Sort JSON
async function sort(json, key) {
  return JSON.sort(json, key);
}

// Filter JSON
async function filter(json, condition) {
  return JSON.filter(json, condition);
}

// Merge JSON
async function merge(json1, json2) {
  return JSON.merge(json1, json2);
}

// Execute command
async function executeCommand(command, filePath, options) {
  switch (command) {
    case 'format':
      const formattedJson = await format(await readJsonFile(filePath));
      await writeJsonFile(filePath, formattedJson);
      break;
    case 'sort':
      const sortedJson = await sort(await readJsonFile(filePath), options[0]);
      await writeJsonFile(filePath, sortedJson);
      break;
    case 'filter':
      const filteredJson = await filter(await readJsonFile(filePath), options[0]);
      await writeJsonFile(filePath, filteredJson);
      break;
    case 'merge':
      const [filePath1, filePath2] = options;
      const [json1, json2] = await Promise.all([readJsonFile(filePath1), readJsonFile(filePath2)]);
      const mergedJson = await merge(json1, json2);
      await writeJsonFile(filePath, mergedJson);
      break;
    default:
      throw new Error('Unknown command');
  }
}

// Main
(async () => {
  try {
    await executeCommand(command, file_path, options);
    console.log('Command executed successfully');
  } catch (error) {
    console.error(error.message);
  }
})();