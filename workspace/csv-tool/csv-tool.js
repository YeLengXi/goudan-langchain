const fs = require('fs');
const { parse, generate } = require('csv-parse/sync');
const { StringDecoder } = require('string_decoder');

// CSV解析器
function parseCSV(file_path) {
  const decoder = new StringDecoder('utf8');
  const data = [];
  let buffer = '';

  fs.createReadStream(file_path)
    .on('data', chunk => {
      buffer += decoder.write(chunk);
      const lines = buffer.split('
');
      buffer = lines.pop();

      lines.forEach(line => {
        const record = parse(line, {
          relax_column_count: true
        });
        data.push(record);
      });
    })
    .on('end', () => {
      if (buffer) {
        const record = parse(buffer, {
          relax_column_count: true
        });
        data.push(record);
      }
    })
    .on('error', err => {
      throw err;
    });

  return data;
}

// CSV生成器
function generateCSV(data, file_path) {
  const csv = data.map(row => row.join(',')).join('
');
  fs.writeFileSync(file_path, csv);
}

// CSV转JSON
function csvToJson(csv_data) {
  return JSON.stringify(csv_data, null, 2);
}

// CSV转Markdown表格
function csvToMarkdown(csv_data) {
  const headers = csv_data[0].map(header => `| ${header} |`).join('
');
  const rows = csv_data.slice(1).map(row => row.map(cell => `| ${cell} |`).join('
')).join('
');
  return `|---|
${headers}
${rows}
`;n
}

// CSV转HTML表格
function csvToHtml(csv_data) {
  const headers = csv_data[0].map(header => `<th>${header}</th>`).join('
');n  const rows = csv_data.slice(1).map(row => row.map(cell => `<td>${cell}</td>`).join('
')).join('
');n  return `<table>
  <tr>${headers}</tr>
  <tr>${rows}</tr>
</table>`;
}

// CSV过滤
function filterCSV(csv_data, column, value) {
  return csv_data.filter(row => row[column] === value);
}

// CSV排序
function sortCSV(csv_data, column) {
  return csv_data.sort((a, b) => a[column] > b[column] ? 1 : -1);
}

module.exports = {
  parseCSV,
  generateCSV,
  csvToJson,
  csvToMarkdown,
  csvToHtml,
  filterCSV,
  sortCSV
}