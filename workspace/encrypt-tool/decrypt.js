const fs = require('fs');
const { decryptFile, encryptFile } = require('./decrypt.js');

// 解密函数
function decrypt(inputFilePath, outputFilePath, method, key) {
  decryptFile(inputFilePath, outputFilePath, method, key);
}

// 加密函数
function encrypt(inputFilePath, outputFilePath, method, key) {
  encryptFile(inputFilePath, outputFilePath, method, key);
}

module.exports = { decrypt, encrypt };