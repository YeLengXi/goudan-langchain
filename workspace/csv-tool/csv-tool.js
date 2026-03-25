const fs = require('fs');
const { Transform } = require('stream');

// CSV解析器
class CSVParser extends Transform {
  constructor(options) {
    super(options);
    this.rowIndex = 0;
    this.currentRow = [];
  }

  _transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('
');
    for (let line of lines) {
      if (this.rowIndex === 0) {
        this.currentRow = line.split(',');
      } else {
        this.currentRow = line.split(',').map(item => item.replace(/"""/g, '"').replace(/"'/g, '"'));
      }
      this.push(this.currentRow.join('
') + '
');
    }
    this.rowIndex++;
    callback();
  }

  _flush(callback) {
    callback();
  }
}

// CSV生成器
function generateCSV(data, headers) {
  const csvData = [headers].map(header => header.join(',')).join('
') + '
' + data.map(row => row.join(',')).join('
')
  return csvData;
}

// CSV转JSON
function csvToJson(csv) {
  const rows = csv.split('
');
  const headers = rows[0].split(',');
  const jsonRows = rows.slice(1).map(row => {
    return headers.reduce((obj, header, index) => {
      obj[header] = row[index];
      return obj;
    }, {});
  });
  return jsonRows;
}

// CSV转Markdown表格
function csvToMarkdown(csv) {
  const rows = csv.split('
');
  const headers = rows[0].split(',').map(header => `| ${header.trim()} |`).join('') + ' |
  |---|---|
' + rows.slice(1).map(row => row.split(',').map(item => `| ${item.trim()} |`).join('')).join('
') + '
';
  return rows[0] + '
' + rows.slice(1).map(row => row.split(',').map(item => item.trim()).join('|')).join('
') + '
';
}

// CSV转HTML表格
function csvToHTML(csv) {
  const rows = csv.split('
');
  const headers = rows[0].split(',').map(header => `<th>${header}</th>`).join('') + '</tr>
' + rows.slice(1).map(row => `<tr>${row.split(',').map(item => `<td>${item}</td>`).join('')}</tr>`).join('
') + '</table>
';
  return `<table>${headers.join('
<tr>')}</table>` + rows.slice(1).map(row => `<tr>${row.split(',').map(item => `<td>${item}</td>`).join('')}</tr>`).join('
') + '</table>
';
}

// CSV过滤
function filterCSV(csv, column, value) {
  const rows = csv.split('
');
  const headers = rows[0].split(',');
  const columnIndex = headers.indexOf(column);
  return rows.slice(1).filter(row => row.split(',')[columnIndex] === value).join('
') + '
';
}

// CSV排序
function sortCSV(csv, column, order) {
  const rows = csv.split('
');
  const headers = rows[0].split(',');
  const columnIndex = headers.indexOf(column);
  return rows.sort((a, b) => {
    const aValue = a.split(',')[columnIndex];
    const bValue = b.split(',')[columnIndex];
    if (order === 'asc') {
      return aValue.localeCompare(bValue);
    } else if (order === 'desc') {
      return bValue.localeCompare(aValue);
    }
  }).join('
') + '
';
}

module.exports = {
  CSVParser,
  generateCSV,
  csvToJson,
  csvToMarkdown,
  csvToHTML,
  filterCSV,
  sortCSV
};