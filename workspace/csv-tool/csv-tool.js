const fs = require('fs');
const { parse, format } = require('csv');

// 解析CSV文件
function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(parse(data, { relax_column_count: true }));
            }
        });
    });
}

// 生成CSV文件
function generateCSV(data, filePath) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, format(data), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// CSV转JSON
function csvToJson(csvData) {
    return JSON.stringify(csvData, null, 2);
}

// CSV转Markdown表格
function csvToMarkdown(csvData) {
    let markdown = '| ';
    csvData[0].forEach(header => {
        markdown += header + ' |';
    });
    markdown += ' |
';
    csvData.forEach(row => {
        markdown += '| ';
        row.forEach(cell => {
            markdown += cell + ' |';
        });
        markdown += ' |
';
    });
    return markdown;
}

// CSV转HTML表格
function csvToHtml(csvData) {
    let html = '<table>
';
    csvData[0].forEach(header => {
        html += '  <th>' + header + '</th>
';n