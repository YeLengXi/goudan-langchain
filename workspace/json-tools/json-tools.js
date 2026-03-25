const fs = require('fs');
const util = require('util');

// 读取文件内容
function read_file(file_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// 写入文件内容
function write_file(file_path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file_path, JSON.stringify(content, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// 格式化JSON
function format(json, indent) {
    return JSON.stringify(json, null, indent);
}

// 排序JSON
function sort(json, key) {
    return json.sort((a, b) => {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    });
}

// 过滤JSON
function filter(json, condition) {
    return json.filter(item => {
        const evalCondition = new Function('item', `return ${condition};`);
        return evalCondition(item);
    });
}

// 合并JSON
function merge(json1, json2) {
    return JSON.stringify({ ...json1, ...json2 }, null, 2);
}

module.exports = { read_file, write_file, format, sort, filter, merge };