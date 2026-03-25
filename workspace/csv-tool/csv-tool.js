const fs = require('fs');
const path = require('path');

// CSV解析器
function parseCSV(file_path) {
  return new Promise((resolve, reject) => {
    const results = [];
    let currentRow = [];
    let inQuotes = false;

    fs.createReadStream(file_path)
      .on('data', (chunk) => {
        let data = chunk.toString();
        for (let i = 0; i < data.length; i++) {
          const char = data[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            currentRow.push(char);
          } else if (char === '
' && !inQuotes) {
            currentRow.push(char);
            results.push(currentRow.join(''));
            currentRow = [];
          } else {
            currentRow.push(char);
          }
        }
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
    fs.writeFile(file_path, data.join('
'), (err) => {
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
  let markdown = '| Header 1 | Header 2 |
  |---------|---------|
';
  csvData.forEach(row => {
    markdown += '| ' + row.join(' | ') + ' |
  });
  return markdown;
}

// CSV转HTML表格
function csvToHtml(csvData) {
  let html = '<table>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
';
  csvData.forEach(row => {
    html += '    <tr>
      <td>' + row.join('</td><td>') + '</td>
    </tr>
  });
  html += '</table>
  return html;
}

// CSV过滤
function filterCSV(csvData, column, value) {
  return csvData.filter(row => row[column] === value);
}

// CSV排序
function sortCSV(csvData, column) {
  return csvData.sort((a, b) => a[column] < b[column] ? -1 : 1);
}

// CLI接口
function cli() {
  const args = process.argv.slice(2);
  const command = args[0];
  const file_path = args[1];

  switch (command) {
    case 'convert':
      const format = args[2];
      parseCSV(file_path)
        .then(data => {
          if (format === 'json') {
            console.log(csvToJson(data));
          }
        })
        .catch(err => {
          console.error(err);
        });
      break;
    case 'filter':
      const column = args[2];
      const value = args[3];
      parseCSV(file_path)
        .then(data => {
          const filteredData = filterCSV(data, column, value);
          console.log(filteredData);
        })
        .catch(err => {
          console.error(err);
        });
      break;
    case 'sort':
      const sortColumn = args[2];
      parseCSV(file_path)
        .then(data => {
          const sortedData = sortCSV(data, sortColumn);
          console.log(sortedData);
        })
        .catch(err => {
          console.error(err);
        });
      break;
    case 'to-table':
      const format = args[2];
      parseCSV(file_path)
        .then(data => {
          if (format === 'markdown') {
            console.log(csvToMarkdown(data));
          } else if (format === 'html') {
            console.log(csvToHtml(data));
          }
        })
        .catch(err => {
          console.error(err);
        });
      break;
    default:
      console.log('Unknown command');
  }
}

cli();