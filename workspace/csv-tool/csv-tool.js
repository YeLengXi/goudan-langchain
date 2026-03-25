const fs = require('fs');
const path = require('path');

// CSV解析器
function parseCSV(fileContent) {
  const rows = fileContent.split('
');
  const headers = rows[0].split(',').map(header => header.trim());
  const data = rows.slice(1).map(row => {
    const values = row.split(',').map(value => value.trim());
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] || '';
      return obj;
    }, {});
  });
  return { headers, data };
}

// CSV生成器
function generateCSV(headers, data) {
  const rows = [headers.join(',')];
  data.forEach(row => {
    rows.push(Object.values(row).join(','));
  });
  return rows.join('
');
}

// CSV转JSON
function csvToJson(csvFilePath) {
  const fileContent = fs.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(fileContent);
  return JSON.stringify({ headers, data }, null, 2);
}

// CSV转Markdown表格
function csvToMarkdown(csvFilePath) {
  const fileContent = fs.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(fileContent);
  const markdownTable = `| ${headers.join(' | ')} |
| --- | --- |
${data.map(row => `| ${Object.values(row).join(' | ')} |`).join('
')};
  return markdownTable;
}

// CSV转HTML表格
function csvToHTML(csvFilePath) {
  const fileContent = fs.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(fileContent);
  const htmlTable = `<table>
  <tr><th>${headers.join('</th><th>')}</th></tr>
${data.map(row => `<tr><td>${Object.values(row).join('</td><td>')}</td></tr>`).join('
')}
</table>`;
  return htmlTable;
}

// CSV过滤
function filterCSV(csvFilePath, column, value) {
  const fileContent = fs.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(fileContent);
  const filteredData = data.filter(row => row[column] === value);
  return generateCSV(headers, filteredData);
}

// CSV排序
function sortCSV(csvFilePath, column) {
  const fileContent = fs.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(fileContent);
  const sortedData = data.sort((a, b) => a[column] > b[column] ? 1 : -1);
  return generateCSV(headers, sortedData);
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
      console.log(csvToJson(filePath));
      break;
    case 'filter':
      const column = options[0];
      const value = options[1];
      console.log(filterCSV(filePath, column, value));
      break;
    case 'sort':
      const column = options[0];
      console.log(sortCSV(filePath, column));
      break;
    case 'to-table':
      const format = options[0];
      if (format === 'markdown') {
        console.log(csvToMarkdown(filePath));
      } else if (format === 'html') {
        console.log(csvToHTML(filePath));
      }
      break;
    default:
      console.log('未知命令');
  }
}

cli();