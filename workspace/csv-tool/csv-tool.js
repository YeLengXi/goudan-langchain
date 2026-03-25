const fs = require('fs');
const { parse, format } = require('csv-parser');
const { StringDecoder } = require('string_decoder');

// CSV解析器
function parseCSV(file_path) {
  return new Promise((resolve, reject) => {
    const results = [];
    const decoder = new StringDecoder('utf8');
    fs.createReadStream(file_path)
      .on('data', (chunk) => {
        const lines = decoder.write(chunk).split('
');
        lines.forEach((line) => {
          if (line) {
            results.push(parse(line));
          }
        });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

// CSV生成器
function generateCSV(data, file_path) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(file_path);
    stream.write(format(data) + '
');
    stream.end();
    resolve();
  });
}

// CSV转JSON
function csvToJson(file_path) {
  return parseCSV(file_path).then((data) => {
    return JSON.stringify(data, null, 2);
  });
}

// CSV转Markdown表格
function csvToMarkdown(file_path) {
  return parseCSV(file_path).then((data) => {
    let markdown = '| Header 1 | Header 2 |
    markdown += '|---|---|
    data.forEach((row) => {
      markdown += '| ' + row.join(' | ') + ' |
    });
    return markdown;
  });
}

// CSV转HTML表格
function csvToHtml(file_path) {
  return parseCSV(file_path).then((data) => {
    let html = '<table>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
    </table>
    data.forEach((row) => {
      html += '<tr>
        <td>' + row.join('</td><td>') + '</td>
      </tr>
    });
    html += '</table>
    return html;
  });
}

// CSV过滤
function filterCSV(file_path, column, value) {
  return parseCSV(file_path).then((data) => {
    return data.filter((row) => row[column] === value);
  });
}

// CSV排序
function sortCSV(file_path, column) {
  return parseCSV(file_path).then((data) => {
    return data.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1;
      }
      if (a[column] > b[column]) {
        return 1;
      }
      return 0;
    });
  });
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