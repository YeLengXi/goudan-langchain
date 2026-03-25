const fs = require('fs');
const { program } = require('commander');

const formatJson = (json, indent) => {
  return JSON.stringify(json, null, indent);
};

const sortJson = (json, key) => {
  try {
    const data = JSON.parse(json);
    data.sort((a, b) => a[key].localeCompare(b[key]));
    return JSON.stringify(data, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const filterJson = (json, condition) => {
  try {
    const data = JSON.parse(json);
    return JSON.stringify(data.filter(item => eval(condition)), null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const mergeJson = (json1, json2) => {
  try {
    const result = {
      ...JSON.parse(json1),
      ...JSON.parse(json2)
    };
    return JSON.stringify(result, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

program
  .command('format <file>')
  .description('Format JSON file')
  .action(file => {
    const content = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(content);
    console.log(formatJson(json, 2));
  });

program
  .command('sort <file>')
  .option('--key <key>', 'Sort by key')
  .description('Sort JSON file')
  .action(file => {
    const content = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(content);
    console.log(sortJson(json, program.key));
  });

program
  .command('filter <file>')
  .option('--condition <condition>', 'Filter condition')
  .description('Filter JSON file')
  .action(file => {
    const content = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(content);
    console.log(filterJson(json, program.condition));
  });

program
  .command('merge <file1> <file2>')
  .description('Merge two JSON files')
  .action((file1, file2) => {
    const content1 = fs.readFileSync(file1, 'utf8');
    const content2 = fs.readFileSync(file2, 'utf8');
    const json1 = JSON.parse(content1);
    const json2 = JSON.parse(content2);
    console.log(mergeJson(json1, json2));
  });

program.parse(process.argv);
