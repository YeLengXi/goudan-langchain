const fs = require('fs');
const path = require('path');

// CSV解析器
function parseCSV(data) {
  const rows = data.split('\n');
  const headers = rows[0].split(',');
  const result = rows.slice(1).map(row => {
    const values = row.split(',').map(value => value.replace(/\\"/g, '').replace(/"/g, '').trim());
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
  return result;
}

// CSV生成器
function generateCSV(data) {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).join(','));
  return [headers, ...rows].join('\n');
}

// CSV转JSON
function csvToJson(csv) {
  return parseCSV(csv);
}

// CSV转Markdown表格
function csvToMarkdown(csv) {
  const data = parseCSV(csv);
  const headers = data[0].map(header => `| ${header} |`).join('
');
  const rows = data.slice(1).map(row => row.map(value => `| ${value} |`).join('
')).join('
');
  return `|---|---|
${headers}
${rows}`;
}

// CSV转HTML表格
function csvToHtml(csv) {
  const data = parseCSV(csv);
  const headers = data[0].map(header => `<th>${header}</th>`).join('
');n  const rows = data.slice(1).map(row => row.map(value => `<td>${value}</td>`).join('
')).join('
');n  return `<table>
  <tr>${headers}</tr>
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
  return data.sort((a, b) => a[column] > b[column] ? 1 : -1);
}

// CLI接口
const commander = require('commander');
const program = new commander.Command();
program
  .command('convert <input> --format <format>')
  .description('Convert CSV to other formats')
  .action((input, format) => {
    const csv = fs.readFileSync(input, 'utf8');
    const converted = format === 'json' ? csvToJson(csv) : (format === 'markdown' ? csvToMarkdown(csv) : (format === 'html' ? csvToHtml(csv) : ''));
    fs.writeFileSync(path.join(__dirname, 'output.csv'), converted, 'utf8');
  })
  .on('error', (err) => {
    console.error(err);
  });

  .command('filter <input> --column <column> --value <value>')
  .description('Filter CSV by column and value')
  .action((input, column, value) => {
    const csv = fs.readFileSync(input, 'utf8');
    const filtered = filterCSV(csv, column, value);
    fs.writeFileSync(path.join(__dirname, 'output.csv'), generateCSV(filtered), 'utf8');
  })
  .on('error', (err) => {
    console.error(err);
  });

  .command('sort <input> --column <column>')
  .description('Sort CSV by column')
  .action((input, column) => {
    const csv = fs.readFileSync(input, 'utf8');
    const sorted = sortCSV(csv, column);
    fs.writeFileSync(path.join(__dirname, 'output.csv'), generateCSV(sorted), 'utf8');
  })
  .on('error', (err) => {
    console.error(err);
  });

  .command('to-table <input> --format <format>')
  .description('Convert CSV to table format')
  .action((input, format) => {
    const csv = fs.readFileSync(input, 'utf8');
    const converted = format === 'markdown' ? csvToMarkdown(csv) : (format === 'html' ? csvToHtml(csv) : '');
    fs.writeFileSync(path.join(__dirname, 'output.csv'), converted, 'utf8');
  })
  .on('error', (err) => {
    console.error(err);
  });

program.parse(process.argv);
