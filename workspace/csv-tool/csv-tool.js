const fs = require('fs');
const path = require('path');

// CSV解析器
function parseCSV(data) {
  const rows = data.split('
');
  const headers = rows[0].split(',');
  const parsedRows = rows.slice(1).map(row => {
    const values = row.split(',').map(value => value.replace(/""/g, '"').replace(/(^"|"$)/g, \"\"));
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {});
  });
  return parsedRows;
}

// CSV生成器
function generateCSV(data) {
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]).join(','));
  return [headers.join(','), ...rows].join('
');
}

// CSV转JSON
function csvToJson(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonData = parseCSV(data);
  fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(jsonData, null, 2), 'utf8');
}

// CSV转Markdown表格
function csvToMarkdown(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonData = parseCSV(data);
  const markdownTable = jsonData.map(row => Object.values(row).join('|')).join('
');
  fs.writeFileSync(path.join(__dirname, 'output.md'), markdownTable, 'utf8');
}

// CSV转HTML表格
function csvToHtml(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonData = parseCSV(data);
  const htmlTable = jsonData.map(row => Object.values(row).map(value => `<td>${value}</td>`).join('')).join('
');
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>CSV Table</title>
</head>
<body>
  <table>
    <tr>${Object.keys(jsonData[0]).map(key => `<th>${key}</th>`).join('')}</tr>
    <tr>${htmlTable}</tr>
  </table>
</body>
</html>`;
  fs.writeFileSync(path.join(__dirname, 'output.html'), html, 'utf8');
}

// CSV过滤
function csvFilter(filePath, column, value) {
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonData = parseCSV(data);
  const filteredData = jsonData.filter(row => row[column] === value);
  fs.writeFileSync(path.join(__dirname, 'output_filtered.csv'), generateCSV(filteredData), 'utf8');
}

// CSV排序
function csvSort(filePath, column) {
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonData = parseCSV(data);
  jsonData.sort((a, b) => a[column] > b[column] ? 1 : -1);
  fs.writeFileSync(path.join(__dirname, 'output_sorted.csv'), generateCSV(jsonData), 'utf8');
}

// CLI接口
function cli() {
  const args = process.argv.slice(2);
  const command = args[0];
  const filePath = args[1];
  const options = args.slice(2);

  switch (command) {
    case 'convert':
      const format = options[0];
      if (format === 'json') {
        csvToJson(filePath);
      } else if (format === 'markdown') {
        csvToMarkdown(filePath);
      } else if (format === 'html') {
        csvToHtml(filePath);
      }
      break;
    case 'filter':
      const column = options[0];
      const value = options[1];
      csvFilter(filePath, column, value);
      break;
    case 'sort':
      const column = options[0];
      csvSort(filePath, column);
      break;
    case 'to-table':
      const format = options[0];
      if (format === 'markdown') {
        csvToMarkdown(filePath);
      } else if (format === 'html') {
        csvToHtml(filePath);
      }
      break;
    default:
      console.log('Unknown command');
  }
}

cli();