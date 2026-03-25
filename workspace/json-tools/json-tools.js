const fs = require('fs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM();
const { JSONParser } = dom.window;

const read_file = (file_path) => {
  const data = fs.readFileSync(file_path, 'utf8');
  try {
    return JSONParser.parse(data);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
};

const write_file = (file_path, content) => {
  fs.writeFileSync(file_path, content, 'utf8');
};

const format = (json, indent = 2) => {
  return JSON.stringify(json, null, indent);
};

const sort = (json, key) => {
  if (!json || !Array.isArray(json)) {
    throw new Error('Invalid input');
  }
  return json.sort((a, b) => a[key].localeCompare(b[key]));
};

const filter = (json, condition) => {
  if (!json || !Array.isArray(json)) {
    throw new Error('Invalid input');
  }
  return json.filter(item => {
    const value = item[condition.split(' ')[0]];
    const operator = condition.split(' ')[1];
    const expected = condition.split(' ')[2];
    return operator === '==' ? value === expected : value > expected;
  });
};

const merge = (json1, json2) => {
  return JSON.stringify({
    ...json1,
    ...json2
  });
};

module.exports = {
  read_file,
  write_file,
  format,
  sort,
  filter,
  merge
};