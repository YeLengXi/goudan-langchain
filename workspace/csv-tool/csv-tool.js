const fs = require('fs');
const path = require('path');

// CSV解析器
function parseCSV(file_path) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(file_path)
      .on('data', (chunk) => {
        let rows = chunk.toString().split('
');
        let parsedRows = [];
        rows.forEach((row) => {
          let cells = row.split(',');
          let parsedCells = [];
          cells.forEach((cell) => {
            parsedCells.push(cell.replace(/""/g, '"').replace(/\\/g, '\').replace(/\\"/g, '"'));
          });
          parsedRows.push(parsedCells);
        });
        resolve(parsedRows);
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        // 解析完成
      });
  });
}

// CSV生成器
function generateCSV(data) {
  let csv = '';
  data.forEach((row) => {
    row.forEach((cell) => {
      csv += cell + ',';
    });
    csv += '\n';n  });
  return csv.slice(0, -1);
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
    markdown += '| --- | --- |
    data.forEach((row) => {
      markdown += '| ' + row.join(' | ') + ' |
    });
    return markdown;
  });
}

// CSV转HTML表格
function csvToHTML(file_path) {
  return parseCSV(file_path).then((data) => {
    let html = '<table>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
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
      return a[column] > b[column] ? 1 : -1;
    });
  });
}

// CLI接口
function cli() {
  const args = process.argv.slice(2);
  const command = args[0];
  const file_path = args[1];
  let options = {};
  args.slice(2).forEach((arg) => {
    const [key, value] = arg.split('=');
    options[key] = value;
  });

  switch (command) {
    case 'convert':
      if (options.format === 'json') {
        csvToJson(file_path).then((json) => {
          console.log(json);
        });
      }
      break;
    case 'filter':
      if (options.column && options.value) {
        filterCSV(file_path, options.column, options.value).then((filteredData) => {
          console.log(filteredData);
        });
      }
      break;
    case 'sort':
      if (options.column) {
        sortCSV(file_path, options.column).then((sortedData) => {
          console.log(sortedData);
        });
      }
      break;
    case 'to-table':
      if (options.format === 'markdown') {
        csvToMarkdown(file_path).then((markdown) => {
          console.log(markdown);
        });
      }
      break;
    default:
      console.log('Unknown command');
  }
}

// 运行CLI接口
cli();