const { format, sort, filter, merge } = require('json-tool-functions');

module.exports = {
  format(json, indent) {
    return JSON.stringify(json, null, indent);
  },
  sort(json, key) {
    return JSON.parse(JSON.stringify(json)).sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  },
  filter(json, condition) {
    return json.filter(item => eval(condition));
  },
  merge(json1, json2) {
    return json1.concat(json2);
  }
};
