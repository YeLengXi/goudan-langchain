const fs = require('fs');
const { promisify } = require('util');
const read_file = promisify(fs.readFile);
const write_file = promisify(fs.writeFile);
const exec_command = require('child_process').exec;
const list_directory = require('fs').readdir;

// JSON processing functions

function format(json, indent) {
  return JSON.stringify(json, null, indent);
}

function sort(json, key) {
  return JSON.parse(JSON.stringify(json)).sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}

function filter(json, condition) {
  return json.filter(item => {
    const jsdom = new JSDOM(`<html><body>${JSON.stringify(item)}</body></html>`);
    const document = jsdom.window.document;
    const parser = new DOMParser();
    const xml = parser.parseFromString(document.body.innerHTML, "text/xml");
    const result = eval(condition);
    return result;
  });
}

function merge(json1, json2) {
  return JSON.parse(JSON.stringify(json1)).concat(json2);
}

// CLI interface

const args = process.argv.slice(2);
const command = args[0];
const file = args[1];
const options = args.slice(2);

switch (command) {
  case 'format':
    (async () => {
      try {
        const data = await read_file(file);
        const json = JSON.parse(data);
        const formatted = format(json, parseInt(options[0]) || 2);
        console.log(formatted);
      } catch (error) {
        console.error('Error:', error);
      }
    })()
    break;
  case 'sort':
    (async () => {
      try {
        const data = await read_file(file);
        const json = JSON.parse(data);
        const key = options[0];
        const sorted = sort(json, key);
        console.log(JSON.stringify(sorted, null, 2));
      } catch (error) {
        console.error('Error:', error);
      }
    })()
    break;
  case 'filter':
    (async () => {
      try {
        const data = await read_file(file);
        const json = JSON.parse(data);
        const condition = options[0];
        const filtered = filter(json, condition);
        console.log(JSON.stringify(filtered, null, 2));
      } catch (error) {
        console.error('Error:', error);
      }
    })()
    break;
  default:
    console.log('Unknown command');
}
