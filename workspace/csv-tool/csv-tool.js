const fs = require('fs');
const path = require('path');
const util = require('./utils');

const parseCSV = (csvData) => {
  const rows = csvData.split('
');
  const headers = rows[0].split(',').map(header => header.trim());
  const data = rows.slice(1).map(row => {
    return rows[0].split(',').reduce((acc, header, index) => {
      acc[header.trim()] = row.split(',')[index].trim();
      return acc;
    }, {});
  });
  return { headers, data };
};

const generateCSV = (data, headers) => {
  const csv = headers.join(',') + '
';
  data.forEach(row => {
    const values = headers.map(header => row[header]).join(',');
    csv += values + '
';
  });
  return csv;
};

const convertCSVToJson = (csvFilePath) => {
  const csvData = util.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(csvData);
  return { headers, data };
};

const convertJsonToCSV = (jsonData, headers) => {
  const csv = generateCSV(jsonData, headers);
  return csv;
};

const filterCSV = (csvFilePath, column, value) => {
  const csvData = util.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(csvData);
  const filteredData = data.filter(row => row[column] === value);
  return convertJsonToCSV(filteredData, headers);
};

const sortCSV = (csvFilePath, column) => {
  const csvData = util.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(csvData);
  const sortedData = data.sort((a, b) => {
    if (a[column] < b[column]) {
      return -1;
    }
    if (a[column] > b[column]) {
      return 1;
    }
    return 0;
  });
  return convertJsonToCSV(sortedData, headers);
};

const convertCSVToMarkdown = (csvFilePath) => {
  const csvData = util.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(csvData);
  const markdown = ' | '.repeat(headers.length) + '
' + headers.join(' | ') + '
' + '-|-'.repeat(headers.length) + '
';
  data.forEach(row => {
    const values = headers.map(header => row[header]).join(' | ');
    markdown += values + '
';
  });
  return markdown;
};

const convertCSVToHTML = (csvFilePath) => {
  const csvData = util.readFileSync(csvFilePath, 'utf8');
  const { headers, data } = parseCSV(csvData);
  const html = '<table>
  <tr>
    <th>' + headers.join('</th><th>') + '</th>
  </tr>
';
  data.forEach(row => {
    html += '  <tr>
    <td>' + row.join('</td><td>') + '</td>
  </tr>
';
  });
  html += '  </table>
';
  return html;
};

module.exports = {
  parseCSV,
  generateCSV,
  convertCSVToJson,
  convertJsonToCSV,
  filterCSV,
  sortCSV,
  convertCSVToMarkdown,
  convertCSVToHTML
};