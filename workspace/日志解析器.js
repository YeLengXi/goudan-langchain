const fs = require('fs');
const path = require('path');
const readline = require('readline');

const supportedFormats = ['app', 'apache', 'error'];

function parseLog(fileContent, format) {
  let parsedData = [];

  if (format === 'app') {
    const lines = fileContent.split('
');
    lines.forEach(line => {
      const parts = line.split(' ');
      const timestamp = parts[0];
      const level = parts[1];
      const message = parts.slice(2).join(' ');
      parsedData.push({ timestamp, level, message });
    });
  } else if (format === 'apache') {
    const lines = fileContent.split('
');
    lines.forEach(line => {
      const parts = line.split(' ');
      const timestamp = parts[0] + ' ' + parts[1];
      const level = parts[2];
      const message = parts.slice(3).join(' ');
      parsedData.push({ timestamp, level, message });
    });
  } else if (format === 'error') {
    const lines = fileContent.split('
');
    lines.forEach(line => {
      const parts = line.split('
');
      const message = parts[0];
      parsedData.push({ message });
    });
  }

  return parsedData;
}

function analyzeLog(file_path) {
  const fileContent = fs.readFileSync(file_path, 'utf8');
  const format = fileContent.match(/^\[(.*?)\]/)[1];

  if (!supportedFormats.includes(format)) {
    throw new Error('Unsupported log format');
  }

  const parsedData = parseLog(fileContent, format);

  // Error analysis logic here

  return parsedData;
}

module.exports = {
  analyzeLog
}