const fs = require('fs');
const path = require('path');

// CSV解析器
function parseCSV(data) {
  const rows = data.split('
');
  const headers = rows[0].split(',').map(header => header.trim());
  const parsedRows = rows.slice(1).map(row => {
    const values = row.split(',').map(value => value.trim());
    return headers.reduce((acc, header, index) => {
      acc[header] = values[index];
      return acc;
    }, {});
  });
  return parsedRows;
}

// CSV生成器
function generateCSV(data) {
  const headers = Object.keys(data[0]).join(', ');
  const rows = data.map(row => Object.values(row).join(', ')).join('
');
  return `${headers}
${rows}`;
}

// CSV转JSON
function csvToJson(csv) {
  return parseCSV(csv).map(row => {
    return row;
  });
}

// CSV转Markdown表格
function csvToMarkdown(csv) {
  const data = parseCSV(csv);
  const headers = data[0].map(header => `| ${header} |`).join('
');
  const rows = data.slice(1).map(row => row.map(value => `| ${value} |`).join('
')).join('
');
  return `|---|
${headers}
${rows}`;
}

// CSV转HTML表格
function csvToHTML(csv) {
  const data = parseCSV(csv);
  const headers = data[0].map(header => `<th>${header}</th>`).join('
');n  const rows = data.slice(1).map(row => row.map(value => `<td>${value}</td>`).join('
')).join('
');n  return `<table>
  <tr>
    ${headers}
  </tr>
  <tr>${rows}</tr>
</table>`;
}

// CSV过滤
function filterCSV(csv, column, value) {
  const data = parseCSV(csv);
  return data.filter(row => row[column] === value);
}

// CSV排序
function sortCSV(csv, column) {
  const data = parseCSV(csv);
  return data.sort((a, b) => {
    if (a[column] < b[column]) return -1;
    if (a[column] > b[column]) return 1;
    return 0;
  });
}

// CLI接口
const cli = require('commander');
cli.version('1.0.0');
cli.command('convert <input> --format <format>').action((input, format) => {
  const csv = fs.readFileSync(input, 'utf8');
  const convertedData = format === 'json' ? csvToJson(csv) : csvToMarkdown(csv);
  fs.writeFileSync(`output.${format}`, convertedData, 'utf8');
});
cli.command('filter <input> --column <column> --value <value>').action((input, column, value) => {
  const csv = fs.readFileSync(input, 'utf8');
  const filteredData = filterCSV(csv, column, value);
  fs.writeFileSync('output.csv', generateCSV(filteredData), 'utf8');
});
cli.command('sort <input> --column <column>').action((input, column) => {
  const csv = fs.readFileSync(input, 'utf8');
  const sortedData = sortCSV(csv, column);
  fs.writeFileSync('output.csv', generateCSV(sortedData), 'utf8');
});
cli.command('to-table <input> --format <format>').action((input, format) => {
  const csv = fs.readFileSync(input, 'utf8');
  const convertedData = format === 'markdown' ? csvToMarkdown(csv) : csvToHTML(csv);
  fs.writeFileSync(`output.${format}`, convertedData, 'utf8');
});
cli.parse(process.argv);
