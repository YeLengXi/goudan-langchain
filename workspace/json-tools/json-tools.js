const fs = require('fs');
const util = require('util');
const path = require('path');

const format = (json, indent) => {
  return JSON.stringify(json, null, indent);
};

const sort = (json, key) => {
  return JSON.stringify(
    Object.keys(json).sort((a, b) => {
      if (json[a][key] < json[b][key]) {
        return -1;
      }
      if (json[a][key] > json[b][key]) {
        return 1;
      }
      return 0;
    }).reduce((obj, key) => {
      obj[key] = json[key];
      return obj;
    }, {})
  );
};

const filter = (json, condition) => {
  return JSON.stringify(
    json.filter(item => {
      const result = eval(condition);
      return result;
    })
  );
};

const merge = (json1, json2) => {
  return JSON.stringify(
    Object.assign({}, json1, json2)
  );
};

const processCommand = () => {
  const args = process.argv.slice(2);
  const command = args[0];
  const filePath = args[1];
  const options = args.slice(2);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContent);

    switch (command) {
      case 'format':
        console.log(format(json, options[0] || 2));
        break;
      case 'sort':
        const key = options[0];
        console.log(sort(json, key));
        break;
      case 'filter':
        const condition = options[0];
        console.log(filter(json, condition));
        break;
      case 'merge':
        const json2 = JSON.parse(fs.readFileSync(options[0], 'utf8'));
        console.log(merge(json, json2));
        break;
      default:
        console.log('Unknown command');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

processCommand();