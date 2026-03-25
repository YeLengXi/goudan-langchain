const fs = require('fs');
const program = require('commander');

// 读取文件内容
const read_file = (file_path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
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
    return JSON.stringify(JSON.parse(json), null, indent);
};

// 排序JSON
const sort = (json, key) => {
    const data = JSON.parse(json);
    data.sort((a, b) => {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    });
    return JSON.stringify(data, null, 2);
};

// 过滤JSON
const filter = (json, condition) => {
    const data = JSON.parse(json);
    return JSON.stringify(data.filter(item => eval(condition)), null, 2);
};

// 合并JSON
const merge = (json1, json2) => {
    return JSON.stringify(JSON.parse(json1).concat(JSON.parse(json2)), null, 2);
};

// 处理命令行参数
program.version('1.0.0').description('JSON数据处理工具').command('format <file>', '格式化JSON').argument('<file>', 'JSON文件路径').action((file) => {
    read_file(file).then(data => {
        console.log(format(data, 2));
    }).catch(err => {
        console.error('Error:', err);
    });
}).command('sort <file>', '排序JSON').argument('<file>', 'JSON文件路径').option('--key <key>', '排序的键').action((file, options) => {
    read_file(file).then(data => {
        console.log(sort(data, options.key));
    }).catch(err => {
        console.error('Error:', err);
    });
}).command('filter <file>', '过滤JSON').argument('<file>', 'JSON文件路径').option('--condition <condition>', '过滤条件').action((file, options) => {
    read_file(file).then(data => {
        console.log(filter(data, options.condition));
    }).catch(err => {
        console.error('Error:', err);
    });
}).command('merge <file1> <file2>', '合并JSON').argument('<file1>', 'JSON文件路径1').argument('<file2>', 'JSON文件路径2').action((file1, file2) => {
    read_file(file1).then(data1 => {
        read_file(file2).then(data2 => {
            console.log(merge(data1, data2));
        }).catch(err => {
            console.error('Error:', err);
        });
    }).catch(err => {
        console.error('Error:', err);
    });
}).parse(process.argv);
