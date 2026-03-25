const fs = require('fs');
const { parse, generate } = require('csv-parse/sync');
const { StringDecoder } = require('string_decoder');

// 解析CSV文件
function parseCSV(filePath) {
    const decoder = new StringDecoder('utf8');
    const fileBuffer = fs.readFileSync(filePath);
    const fileContent = decoder.write(fileBuffer.toString());
    const parsedData = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });
    return parsedData;
}

// 生成CSV文件
function generateCSV(data, filePath) {
    const csv = require('csv-stringify/sync')(data, {
        header: true
    });
    fs.writeFileSync(filePath, csv);
}

// CSV转JSON
function csvToJson(csvFilePath, jsonFilePath) {
    const csvData = parseCSV(csvFilePath);
    const jsonData = JSON.stringify(csvData, null, 2);
    fs.writeFileSync(jsonFilePath, jsonData);
}

// CSV转Markdown表格
function csvToMarkdown(csvFilePath, markdownFilePath) {
    const csvData = parseCSV(csvFilePath);
    const markdown = '\|' + csvData.columns.join('\|') + '\|
|---|---|
' + csvData.rows.map(row => '\|' + row.join('\|') + '\|
').join('\n');
    fs.writeFileSync(markdownFilePath, markdown);
}

// CSV转HTML表格
function csvToHtml(csvFilePath, htmlFilePath) {
    const csvData = parseCSV(csvFilePath);
    const html = '<table>
' + csvData.columns.map(column => '<th>' + column + '</th>').join('
') + '
</table>
' + csvData.rows.map(row => '<tr>
' + row.map(cell => '<td>' + cell + '</td>').join('
') + '</tr>').join('
');
    fs.writeFileSync(htmlFilePath, html);
}

// CSV过滤
function csvFilter(csvFilePath, column, value) {
    const csvData = parseCSV(csvFilePath);
    const filteredData = csvData.rows.filter(row => row[column] === value);
    generateCSV(filteredData, csvFilePath);
}

// CSV排序
function csvSort(csvFilePath, column) {
    const csvData = parseCSV(csvFilePath);
    const sortedData = csvData.rows.sort((a, b) => a[column] > b[column] ? 1 : -1);
    generateCSV(sortedData, csvFilePath);
}

// CLI接口
function cliInterface() {
    const args = process.argv.slice(2);
    switch (args[0]) {
        case 'convert':
            csvToJson(args[1], args[2]);
            break;
        case 'filter':
            csvFilter(args[1], args[2], args[3]);
            break;
        case 'sort':
            csvSort(args[1], args[2]);
            break;
        case 'to-table':
            csvToMarkdown(args[1], args[2]);
            break;
        default:
            console.log('未知命令');
    }
}

// 运行CLI接口
cliInterface();