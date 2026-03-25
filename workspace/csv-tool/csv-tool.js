const fs = require('fs');
const path = require('path');

// 解析CSV文件
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const rows = data.split('
');
        const headers = rows[0].split(',');
        const parsedRows = rows.slice(1).map(row => {
          const values = row.split(',').map(value => value.replace(/""/g, '"'));
          return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
        });
        resolve(parsedRows);
      }
    });
  });
}

// 生成CSV文件
function generateCSV(data, headers) {
  const rows = data.map(row => headers.map(header => row[header] || '').join(','));
  return rows.join('
') + '
';
}

// CSV转JSON
function csvToJson(filePath) {
  return parseCSV(filePath).then(data => JSON.stringify(data, null, 2));
}

// CSV转Markdown表格
function csvToMarkdown(filePath) {
  return parseCSV(filePath).then(data => {
    const headers = data[0].keys();
    const rows = data.map(row => headers.map(header => row[header]).join('| ')).join('
|---|
');
    return `| ${headers.join(' | ')} |
${rows}`;
  });
}

// CSV转HTML表格
function csvToHTML(filePath) {
  return parseCSV(filePath).then(data => {
    const headers = data[0].keys();
    const rows = data.map(row => headers.map(header => row[header]).join('</td><td>')).join('</tr>
<tr>');
    return `<table>
  <tr><td>${headers.join('</td><td>')}</td></tr>
  <tr>${rows}</tr>
</table>`;
  });
}

// CSV过滤
function csvFilter(filePath, column, value) {
  return parseCSV(filePath).then(data => {
    return data.filter(row => row[column] === value);
  });
}

// CSV排序
function csvSort(filePath, column) {
  return parseCSV(filePath).then(data => {
    return data.sort((a, b) => a[column] > b[column] ? 1 : -1);
  });
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
        csvToJson(filePath).then(data => {
          console.log(data);
        }).catch(err => {
          console.error(err);
        });
      }
      break;
    case 'filter':
      const column = options[0];
      const value = options[1];
      csvFilter(filePath, column, value).then(data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      });
      break;
    case 'sort':
      const column = options[0];
      csvSort(filePath, column).then(data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      });
      break;
    case 'to-table':
      const format = options[0];
      if (format === 'markdown') {
        csvToMarkdown(filePath).then(data => {
          console.log(data);
        }).catch(err => {
          console.error(err);
        });
      }
      break;
    default:
      console.log('Unknown command');
  }
}

// 运行CLI接口
cli();