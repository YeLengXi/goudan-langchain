const fs = require('fs');
const { program } = require('commander');

const format = (json, indent) => {
  try {
    const formattedJson = JSON.stringify(JSON.parse(json), null, indent);
    return formattedJson;
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const sort = (json, key) => {
  try {
    const data = JSON.parse(json);
    data.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    return JSON.stringify(data, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const filter = (json, condition) => {
  try {
    const data = JSON.parse(json);
    return JSON.stringify(data.filter(item => eval(condition)), null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const merge = (json1, json2) => {
  try {
    const obj1 = JSON.parse(json1);
    const obj2 = JSON.parse(json2);
    return JSON.stringify(Object.assign({}, obj1, obj2), null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

program
  .command('format <json> [indent]')
  .description('Format JSON data')
  .action((json, indent) => {
    console.log(format(json, indent || 2));
  })
  .option('--indent <number>', 'specify the indent number');

program
  .command('sort <json> --key <key>')
  .description('Sort JSON data by key')
  .action((json, key) => {
    console.log(sort(json, key));
  });

program
  .command('filter <json> --condition <condition>')
  .description('Filter JSON data by condition')
  .action((json, condition) => {
    console.log(filter(json, condition));
  });

program
  .command('merge <json1> <json2>')
  .description('Merge two JSON data')
  .action((json1, json2) => {
    console.log(merge(json1, json2));
  });

program.parse(process.argv);
