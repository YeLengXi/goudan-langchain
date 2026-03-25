const fs = require('fs');
const { parse, format } = require('csv');
const { program } = require('commander');

// 解析CSV文件
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const records = parse(data, {
          relax_column_count: true
        });
        resolve(records);
      }
    });
  });
}

// 生成CSV文件
function generateCSV(records, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, format(records, {
      header: true
    }), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// 转换CSV到JSON
function csvToJson(filePath) {
  return parseCSV(filePath).then(records => {
    return JSON.stringify(records, null, 2);
  });
}

// 转换CSV到Markdown表格
function csvToMarkdown(filePath) {
  return parseCSV(filePath).then(records => {
    let markdown = '| Header 1 | Header 2 |
    markdown += '|---|---|
    records.forEach(record => {
      markdown += '| ' + record.join(' | ') + ' |
    });
    return markdown;
  });
}

// 转换CSV到HTML表格
function csvToHtml(filePath) {
  return parseCSV(filePath).then(records => {
    let html = '<table>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
    </tr>
    records.forEach(record => {
      html += ' '<tr>
        <td>' + record.join('</td><td>') + '</td>
      </tr>
    });
    html += '</table>
    return html;
  });
}

// 过滤CSV文件
function filterCSV(filePath, column, value) {
  return parseCSV(filePath).then(records => {
    return records.filter(record => record[column] === value);
  });
}

// 排序CSV文件
function sortCSV(filePath, column) {
  return parseCSV(filePath).then(records => {
    return records.sort((a, b) => {
      return a[column].localeCompare(b[column]);n    });
  });
}

// CLI接口
program.version('1.0.0').description('CSV数据处理工具');
program.command('convert <input> --format <format>').action((input, format) => {
  switch (format) {
    case 'json':
      csvToJson(input).then(data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      });
      break;
    case 'markdown':
      csvToMarkdown(input).then(data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      });
      break;
    case 'html':
      csvToHtml(input).then(data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      });
      break;
  }
});
program.command('filter <input> --column <column> --value <value>').action((input, column, value) => {
  filterCSV(input, column, value).then(data => {
    console.log(data);
  }).catch(err => {
    console.error(err);
  });
});
program.command('sort <input> --column <column>').action((input, column) => {
  sortCSV(input, column).then(data => {
    console.log(data);
  }).catch(err => {
    console.error(err);
  });
});
program.command('to-table <input> --format <format>').action((input, format) => {
  switch (format) {
    case 'markdown':
      csvToMarkdown(input).then(data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      });
      break;
    case 'html':
      csvToHtml(input).then(data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      });
      break;
  }
});

program.parse(process.argv);
