const fs = require('fs');

const format = (json, indent) => {
  return JSON.stringify(json, null, indent);
};

const sort = (json, key) => {
  return JSON.stringify(json.sort((a, b) => a[key].localeCompare(b[key])));
};

const filter = (json, condition) => {
  return JSON.stringify(json.filter(item => eval(condition)));
};

const merge = (json1, json2) => {
  return JSON.stringify(JSON.parse(JSON.stringify(json1)).concat(JSON.parse(JSON.stringify(json2))));
};

const readJsonFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, data, 'utf8');
};

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
      console.log(format(json, indent));
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
      const [filePath1, filePath2] = args.slice(2);
      const json1 = readJsonFile(filePath1);
      const json2 = readJsonFile(filePath2);
      console.log(merge(json1, json2));
      break;
    default:
      console.log('Unknown command');
  }
};

if (require.main === module) {
  main();
}