const fs = require('fs');
const { parse } = require('json2csv');
const { JSDOM } = require('jsdom');
const { DOMParser } = require('xmldom');
const { parseString } = require('xml2js');

const jsonTools = {
  format: (json, indent) => {
    return JSON.stringify(json, null, indent);
  },
  sort: (json, key) => {
    return json.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  },
  filter: (json, condition) => {
    return json.filter(item => {
      try {
        return eval(condition)(item);
      } catch (error) {
        console.error(error);
        return false;
      }
    });
  },
  merge: (json1, json2) => {
    return JSON.stringify(json1, null, 2).concat(',',
      JSON.stringify(json2, null, 2));
  }
};

module.exports = jsonTools;