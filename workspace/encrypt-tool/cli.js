const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { parseArgs } = require('minimist');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const methods = {
  caesar: {
    encrypt: encrypt.caesarCipher,
    decrypt: encrypt.decryptCaesarCipher
  },
  base64: {
    encrypt: encrypt.base64Encode,
    decrypt: encrypt.decryptBase64
  },
  rot13: {
    encrypt: encrypt.rot13,
    decrypt: encrypt.decryptRot13
  },
  xor: {
    encrypt: encrypt.xorEncrypt,
    decrypt: encrypt.decryptXor
  },
  aes: {
    encrypt: encrypt.aesEncrypt,
    decrypt: encrypt.decryptAes
  }
};

function encryptFile(inputPath, outputPath, method, key) {
  const text = fs.readFileSync(inputPath, 'utf8');
  const encrypted = methods[method].encrypt(text, key);
  fs.writeFileSync(outputPath, encrypted, 'utf8');
}

function decryptFile(inputPath, outputPath, method, key) {
  const text = fs.readFileSync(inputPath, 'utf8');
  const decrypted = methods[method].decrypt(text, key);
  fs.writeFileSync(outputPath, decrypted, 'utf8');
}

module.exports = {
  encrypt: encryptFile,
  decrypt: decryptFile
};