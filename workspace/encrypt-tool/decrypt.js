const fs = require('fs');
const path = require('path');
const { encryptFile, decryptFile } = require('./encrypt');

const args = process.argv.slice(2);
const command = args[0];
const inputPath = args[1];
const outputPath = args[3] || inputPath.replace(/\.txt$/, '.dec.txt');
const method = args[2];
const key = args[4] || ''; // 默认为空字符串

switch (command) {
  case 'encrypt':
    encryptFile(inputPath, outputPath, method, key);
    break;
  case 'decrypt':
    decryptFile(inputPath, outputPath, method, key);
    break;
  default:
    console.error('Unknown command');
}
