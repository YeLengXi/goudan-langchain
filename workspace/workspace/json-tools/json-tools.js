const fs = require('fs');
const { parse } = require('json2csv');
const { stringify } = require('json-stringify-safe');

// 读取文件内容
const read_file = (file_path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

// 写入文件内容
const write_file = (file_path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file_path, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// 格式化JSON
const format = (json, indent) => {
    return stringify(json, { replacer: null, space: indent || 2 });
};

// 排序JSON
const sort = (json, key) => {
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

// 过滤JSON
const filter = (json, condition) => {
    return json.filter(item => {
        return condition(item);
    });
};

// 合并JSON
const merge = (json1, json2) => {
    return { ...json1, ...json2 };
};

// 从文件读取JSON
const read_json_file = async (file_path) => {
    try {
        const data = await read_file(file_path);
        return data;
    } catch (err) {
        throw err;
    }
};

// 写入JSON到文件
const write_json_file = async (file_path, content) => {
    try {
        const data = JSON.stringify(content, null, 2);
        await write_file(file_path, data);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    format,
    sort,
    filter,
    merge,
    read_json_file,
    write_json_file
}