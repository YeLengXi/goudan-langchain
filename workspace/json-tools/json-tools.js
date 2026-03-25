const fs = require('fs');
const util = require('util');
const path = require('path');

const format = (json, indent) => {
  try {
    const formattedJson = JSON.stringify(json, null, indent);
    return formattedJson;
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

const sort = (json, key) => {
  try {
    const sortedJson = JSON.stringify(json, (key, value) => {
      return value[key];
    }, null, 2);
    return sortedJson;
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

const filter = (json, condition) => {
  try {
    const filteredJson = json.filter(item => {
      return eval(condition);
    });
    return JSON.stringify(filteredJson, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON or Condition');
  }
}

const merge = (json1, json2) => {
  try {
    const mergedJson = JSON.stringify({
      ...json1,
      ...json2
    }, null, 2);
    return mergedJson;
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

const readJsonFile = (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error('Invalid JSON file');
  }
}

const writeJsonFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    throw new Error('Failed to write JSON file');
  }
}

const main = () => {
  const args = process.argv.slice(2);
  const command = args[0];
  const filePath = args[1];
  let json;

  try {
    json = readJsonFile(filePath);
  } catch (error) {
    console.error(error.message);
    return;
  }

  switch (command) {
    case 'format':
      const indent = args[2] || 2;
      console.log(format(json, parseInt(indent, 10)));
      break;
    case 'sort':
      const key = args[2];
      console.log(sort(json, key));
      break;
    case 'filter':
      const condition = args[2];
      console.log(filter(json, condition));
      break;
    case 'merge':
      const jsonFile2Path = args[2];
      const json2 = readJsonFile(jsonFile2Path);
      console.log(merge(json, json2));
      break;
    default:
      console.log('Unknown command');
  }
}

if (require.main === module) {
  main();
}