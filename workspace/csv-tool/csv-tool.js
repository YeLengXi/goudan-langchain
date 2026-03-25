const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { StringDecoder } = require('string_decoder');

// CSV解析器
function parseCSV(file_path) {
  const decoder = new StringDecoder('utf8');
  let csvData = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;

  fs.createReadStream(file_path)
    .on('data', (chunk) => {
      const chunkStr = decoder.write(chunk);
      for (let i = 0; i < chunkStr.length; i++) {
        const char = chunkStr[i];
        if (char === '\' && inQuotes) {
          currentField += char + chunkStr[i + 1];
          i++;
        } else if (char === '"' && inQuotes) {
          inQuotes = false;
        } else if (char === ',' && !inQuotes) {
          currentRow.push(currentField);
          currentField = '';
        } else if (char === '
' && !inQuotes) {
          csvData.push(currentRow);
          currentRow = [];
          currentField = '';
        } else {
          currentField += char;
        }
      }
    })
    .on('end', () => {
      csvData.push(currentRow);
    });

  return csvData;
}

// CSV生成器
function generateCSV(data, file_path) {
  const csv = [
    data[0].join(','),
    ...data.slice(1).map(row => row.join(',')),
  ];

  fs.writeFileSync(file_path, csv.join('
'));
}

// CSV转JSON
function csvToJson(csvData) {
  return csvData.map(row => {
    return row.reduce((obj, item, index) => {
      obj[csvData[0][index]] = item;
      return obj;
    }, {});
  });
}

// CSV转Markdown表格
function csvToMarkdown(csvData) {
  const headers = csvData[0].join(' | ');
  const rows = csvData.slice(1).map(row => row.join(' | ')).join('
');

  return `| ${headers} |
|---|
${rows}`;
}

// CSV转HTML表格
function csvToHTML(csvData) {
  const headers = csvData[0].join(' | ');
  const rows = csvData.slice(1).map(row => row.join(' | ')).join('
');

  return `<table>
  <tr>
    <th>${headers}</th>
  </tr>
  <tr>${rows}</tr>
</table>`;
}

// CSV过滤
function filterCSV(csvData, column, value) {
  return csvData.filter(row => row[column] === value);
}

// CSV排序
function sortCSV(csvData, column) {
  return csvData.sort((a, b) => a[column] > b[column] ? 1 : -1);
}

module.exports = {
  parseCSV,
  generateCSV,
  csvToJson,
  csvToMarkdown,
  csvToHTML,
  filterCSV,
  sortCSV
};