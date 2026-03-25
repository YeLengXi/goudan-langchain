const crypto = require('crypto');

// 加密算法
function caesarCipher(text, key) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let charCode = char.charCodeAt(0);
      charCode = charCode >= 97 ? charCode + key : charCode - 97 + 123 - key;
      return String.fromCharCode(charCode);
    }
    return char;
  }).join('');
}

function base64Encode(text) {
  return Buffer.from(text).toString('base64');
}

function rot13(text) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let charCode = char.charCodeAt(0);
      charCode = charCode >= 97 ? charCode + 13 : charCode - 13 + 97;
      return String.fromCharCode(charCode);
    }
    return char;
  }).join('');
}

function xorEncrypt(text, key) {
  return text.split('').map((char, index) => {
    let keyChar = key[index % key.length];
    return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
  }).join('');
}

function aesEncrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// 解密算法
function caesarCipherDecrypt(text, key) {
  return caesarCipher(text, -key);
}

function base64Decode(text) {
  return Buffer.from(text, 'base64').toString('utf8');
}

function rot13Decrypt(text) {
  return rot13(text);
}

function xorDecrypt(text, key) {
  return text.split('').map((char, index) => {
    let keyChar = key[index % key.length];
    return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
  }).join('');
}

function aesDecrypt(text, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 文件加密
function encryptFile(inputPath, outputPath, method, key) {
  const text = read_file(inputPath);
  let encryptedText = '';
  switch (method) {
    case 'caesar':
      encryptedText = caesarCipher(text, key);
      break;
    case 'base64':
      encryptedText = base64Encode(text);
      break;
    case 'rot13':
      encryptedText = rot13(text);
      break;
    case 'xor':
      encryptedText = xorEncrypt(text, key);
      break;
    case 'aes':
      encryptedText = aesEncrypt(text, key);
      break;
    default:
      throw new Error('Unsupported encryption method');
  }
  write_file({ content: encryptedText, file_path: outputPath });
}

// 文件解密
function decryptFile(inputPath, outputPath, method, key) {
  const encryptedText = read_file(inputPath);
  let decryptedText = '';
  switch (method) {
    case 'caesar':
      decryptedText = caesarCipherDecrypt(encryptedText, key);
      break;
    case 'base64':
      decryptedText = base64Decode(encryptedText);
      break;
    case 'rot13':
      decryptedText = rot13Decrypt(encryptedText);
      break;
    case 'xor':
      decryptedText = xorDecrypt(encryptedText, key);
      break;
    case 'aes':
      decryptedText = aesDecrypt(encryptedText, key);
      break;
    default:
      throw new Error('Unsupported decryption method');
  }
  write_file({ content: decryptedText, file_path: outputPath });
}

module.exports = { encryptFile, decryptFile };