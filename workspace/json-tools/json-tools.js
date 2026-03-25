const fs = require('fs');

// 读取JSON文件
function readJSONFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Invalid JSON file');
    }
}

// 格式化JSON
function format(json, indent = 4) {
    return JSON.stringify(json, null, indent);
}

// 排序JSON
function sort(json, key) {
    return json.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
}

// 过滤JSON
function filter(json, condition) {
    return json.filter(item => {
        try {
            return eval(condition)(item);
        } catch (error) {
            console.error(error);
            return false;
        }
    });
}

// 合并JSON
function merge(json1, json2) {
    return { ...json1, ...json2 };
}

// 主程序
function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const filePath = args[1];
    let options = {};
    args.slice(2).forEach(arg => {
        const [key, value] = arg.split('=');
        options[key.slice(2)] = value;
    });

    try {
        const json = readJSONFile(filePath);
        switch (command) {
            case 'format':
                console.log(format(json, options.indent || 4));
                break;
            case 'sort':
                console.log(JSON.stringify(sort(json, options.key || Object.keys(json[0]))));
                break;
            case 'filter':
                console.log(JSON.stringify(filter(json, options.condition), null, 2));
                break;
            case 'merge':
                const mergeFilePath = options.file;
                const mergeJson = readJSONFile(mergeFilePath);
                console.log(JSON.stringify(merge(json1, mergeJson), null, 2));
                break;
            default:
                console.log('Unknown command');
        }
    } catch (error) {
        console.error(error.message);
    }
}

main();