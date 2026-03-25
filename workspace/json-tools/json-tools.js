const fs = require('fs');
const { program } = require('commander');

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
    return JSON.stringify(data, null, 4);
};

// 过滤JSON
const filter = (json, condition) => {
    const data = JSON.parse(json);
    return JSON.stringify(data.filter(item => eval(condition)), null, 4);
};

// 合并JSON
const merge = (json1, json2) => {
    return JSON.stringify(JSON.parse(json1).concat(JSON.parse(json2)), null, 4);
};

// 主程序
const main = () => {
    program
        .command('format <file>')
        .description('格式化JSON文件')
        .action((file) => {
            read_file(file).then(data => {
                const formatted = format(data, 4);
                console.log(formatted);
            }).catch(err => {
                console.error(err);
            });
        });

        .command('sort <file> --key <key>')
        .description('排序JSON文件')
        .action((file, options) => {
            read_file(file).then(data => {
                const sorted = sort(data, options.key);
                console.log(sorted);
            }).catch(err => {
                console.error(err);
            });
        });

        .command('filter <file> --condition <condition>')
        .description('过滤JSON文件')
        .action((file, options) => {
            read_file(file).then(data => {
                const filtered = filter(data, options.condition);
                console.log(filtered);
            }).catch(err => {
                console.error(err);
            });
        });

        .command('merge <file1> <file2>')
        .description('合并JSON文件')
        .action((file1, file2) => {
            Promise.all([read_file(file1), read_file(file2)]).then(values => {
                const [data1, data2] = values;
                const merged = merge(data1, data2);
                console.log(merged);
            }).catch(err => {
                console.error(err);
            });
        });

        .parse(process.argv);

        .on('error', (err) => {
            console.error(err.message);
        });
    }

    main();
