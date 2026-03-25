# convert.js

const parseCSV = require('./parseCSV');
const generateCSV = require('./generateCSV');
const fs = require('fs');
const path = require('path');

module.exports = {
  csvToJson: (filePath) => {
    const data = parseCSV.parseCSV(filePath);
    return JSON.stringify(data, null, 2);
  },
  jsonToCsv: (jsonData, options) => {
    const data = JSON.parse(jsonData);
    return generateCSV.generateCSV(data, options);
  },
  csvToMarkdown: (filePath) => {
    const data = parseCSV.parseCSV(filePath);
    let markdown = "| " + data[0].join(' | ') + " |
    |---|
    ";
    data.slice(1).forEach(row => {
      markdown += "| " + row.join(' | ') + " |
    ");
    return markdown;
  },
  csvToHtml: (filePath) => {
    const data = parseCSV.parseCSV(filePath);
    let html = "<table>
  <tr>\n    <th>" + data[0].join('</th><th>') + "</th>\n  </tr>\n  ";
    data.slice(1).forEach(row => {
      html += "  <tr>\n    " + row.join('</td><td>') + "</td>\n  </tr>\n  ");
    html += "</table>";
    return html;
  }
}
