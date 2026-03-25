const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readFileAsync = readFile;
const writeFileAsync = writeFile;

async function format(json, indent = 2) {
    try {
        const formattedJson = JSON.stringify(json, null, indent);
        return formattedJson;
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

async function sort(json, key) {
    try {
        const sortedJson = JSON.stringify(json, (a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        }, 2);
        return sortedJson;
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

async function filter(json, condition) {
    try {
        const filteredJson = JSON.stringify(json.filter(item => eval(condition)), 2);
        return filteredJson;
    } catch (error) {
        throw new Error('Invalid JSON or Condition');
    }
}

async function merge(json1, json2) {
    try {
        return JSON.stringify({
            ...json1,
            ...json2
        }, 2);
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

module.exports = {
    format,
    sort,
    filter,
    merge
}