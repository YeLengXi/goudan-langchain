const fs = require('fs');
const { parse, stringify } = require('jsonc-stable-stringify');
const { deepMerge } = require('deepmerge');

// Helper function to format JSON
function format(json, indent = 2) {
    try {
        const formattedJson = stringify(json, { indent });
        return formattedJson;
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

// Helper function to sort JSON by key
function sort(json, key) {
    try {
        const sortedJson = JSON.parse(format(json));
        sortedJson.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        return JSON.stringify(sortedJson);
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

// Helper function to filter JSON based on condition
function filter(json, condition) {
    try {
        const jsonData = JSON.parse(format(json));
        return JSON.stringify(jsonData.filter(item => eval(condition)));
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

// Helper function to merge JSON objects
function merge(json1, json2) {
    try {
        const mergedJson = deepMerge(JSON.parse(format(json1)), JSON.parse(format(json2)));
        return JSON.stringify(mergedJson);
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

module.exports = { format, sort, filter, merge };