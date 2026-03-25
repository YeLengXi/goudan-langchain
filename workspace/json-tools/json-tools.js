const fs = require('fs');
const { program } = require('commander');

// 读取文件内容
function read_file(file_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// 写入文件内容
function write_file(file_path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file_path, content, 'utf8', (err) => {
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
    return JSON.stringify(json.sort((a, b) => {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    }));
}

// 过滤JSON
function filter(json, condition) {
    return JSON.stringify(json.filter(item => {
        return condition(item);
    }));
}

// 合并JSON
function merge(json1, json2) {
    return JSON.stringify({
        ...json1,
        ...json2
    });
}

// 主程序
async function main() {
    const args = program.parse(process.argv);
    const command = args._[0];
    const file_path = args._[1];

    try {
        const data = await read_file(file_path);
        const json = JSON.parse(data);

        switch (command) {
            case 'format':
                console.log(format(json, parseInt(args.indent, 10) || 2));
                break;
            case 'sort':
                console.log(sort(json, args.key));
                break;
            case 'filter':
                console.log(filter(json, eval(args.condition)));
                break;
            case 'merge':
                const merge_file_path = args._[2];
                const merge_data = await read_file(merge_file_path);
                const merge_json = JSON.parse(merge_data);
                console.log(merge(json1, json2));
                break;
            default:
                console.log('未知命令');
        }
    } catch (error) {
        console.error(error);
    }
}

main();
