const fs = require('fs');
const { JSDOM } = require('jsdom');
const { promisify } = require('util');
const read_file = promisify(fs.readFile);
const write_file = promisify(fs.writeFile);
const exec_command = require('./exec_command');
const list_directory = require('./list_directory');

// JSON processing functions
const format = async (json, indent) => {
  try {
    return JSON.stringify(json, null, indent);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const sort = async (json, key) => {
  try {
    const parsed = JSON.parse(json);
    parsed.sort((a, b) => a[key].localeCompare(b[key]));
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const filter = async (json, condition) => {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed.filter(item => eval(condition)), null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const merge = async (json1, json2) => {
  try {
    const parsed1 = JSON.parse(json1);
    const parsed2 = JSON.parse(json2);
    return JSON.stringify({ ...parsed1, ...parsed2 }, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

// CLI interface
const main = async () => {
  const [command, ...args] = process.argv.slice(2);
  switch (command) {
    case 'format':
      const [inputFile] = args;
      const content = await read_file(inputFile);
      const formatted = await format(content, 2);
      await write_file('output.json', formatted);
      console.log('Formatted JSON saved to output.json');
      break;
    case 'sort':
      const [inputFile, key] = args;
      const content = await read_file(inputFile);
      const sorted = await sort(content, key);
      await write_file('output.json', sorted);
      console.log('Sorted JSON saved to output.json');
      break;
    case 'filter':
      const [inputFile, condition] = args;
      const content = await read_file(inputFile);
      const filtered = await filter(content, condition);
      await write_file('output.json', filtered);
      console.log('Filtered JSON saved to output.json');
      break;
    case 'merge':
      const [file1, file2] = args;
      const content1 = await read_file(file1);
      const content2 = await read_file(file2);
      const merged = await merge(content1, content2);
      await write_file('output.json', merged);
      console.log('Merged JSON saved to output.json');
      break;
    default:
      console.log('Unknown command');
  }
};

main().catch(error => {
  console.error(error.message);
});