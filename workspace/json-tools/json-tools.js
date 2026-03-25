const fs = require('fs');
const program = require('commander');

// 格式化JSON
function format(json, indent) {
  return JSON.stringify(JSON.parse(json), null, indent);
}

// 排序JSON
function sort(json, key) {
  try {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
      throw new Error('JSON is not an array');
    }
    return JSON.stringify(data.sort((a, b) => a[key].localeCompare(b[key])));
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

// 过滤JSON
function filter(json, condition) {
  try {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
      throw new Error('JSON is not an array');
    }
    return JSON.stringify(data.filter(item => eval(condition)));
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

// 合并JSON
function merge(json1, json2) {
  try {
    return JSON.stringify(JSON.parse(json1).concat(JSON.parse(json2)));
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

// 读取文件
function read_file(file_path) {
  return fs.readFileSync(file_path, 'utf8');
}

// 主程序
function main() {
  program
    .version('1.0.0')
    .command('format <file>')
    .description('Format JSON file')
    .action(file => {
      try {
        const json = read_file(file);
        console.log(format(json, 2));
      } catch (error) {
        console.error(error.message);
      }
    })
    .command('sort <file> --key <key>')
    .description('Sort JSON file by key')
    .action((file, options) => {
      try {
        const json = read_file(file);
        console.log(sort(json, options.key));
      } catch (error) {
        console.error(error.message);
      }
    })
    .command('filter <file> --condition <condition>')
    .description('Filter JSON file by condition')
    .action((file, options) => {
      try {
        const json = read_file(file);
        console.log(filter(json, options.condition));
      } catch (error) {
        console.error(error.message);
      }
    })
    .command('merge <file1> <file2>')
    .description('Merge two JSON files')
    .action((file1, file2) => {
      try {
        const json1 = read_file(file1);
        const json2 = read_file(file2);
        console.log(merge(json1, json2));
      } catch (error) {
        console.error(error.message);
      }
    })
    .parse(process.argv);
}

main();