module.exports = {
  format: format,
  sort: sort,
  filter: filter,
  merge: merge
};

const format = (json, indent) => {
  return JSON.stringify(json, null, indent);
};

const sort = (json, key) => {
  if (!json || !Array.isArray(json)) {
    throw new Error('Invalid JSON');
  }
  return json.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
};

const filter = (json, condition) => {
  if (!json || !Array.isArray(json)) {
    throw new Error('Invalid JSON');
  }
  return json.filter(item => {
    try {
      return eval(condition)(item);
    } catch (error) {
      console.error(error);
      return false;
    }
  });
};

const merge = (json1, json2) => {
  return JSON.stringify(JSON.parse(JSON.stringify(json1)).concat(JSON.parse(JSON.stringify(json2))));
};