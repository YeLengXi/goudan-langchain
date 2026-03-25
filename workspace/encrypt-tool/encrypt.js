const crypto = require('crypto');
const fs = require('fs');

// 加密函数
function encrypt(text, method, key, output) {
  switch (method) {
    case 'caesar':
      return caesarCipher(text, key);
    case 'base64':
      return base64Encode(text);
    case 'rot13':
      return rot13(text);
    case 'xor':
      return xorEncrypt(text, key);
    case 'aes':
      return aesEncrypt(text, key);
    default:
      throw new Error('Unsupported encryption method');
  }
}

// 解密函数
function decrypt(encryptedText, method, key) {
  switch (method) {
    case 'caesar':
      return caesarCipher(encryptedText, -key);
    case 'base64':
      return base64Decode(encryptedText);
    case 'rot13':
      return rot13(encryptedText);
    case 'xor':
      return xorDecrypt(encryptedText, key);
    case 'aes':
      return aesDecrypt(encryptedText, key);
    default:
      throw new Error('Unsupported decryption method');
  }
}

// 凯撒密码加密
function caesarCipher(text, key) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let code = char.charCodeAt(0) + key;
      if (code > 'z'.charCodeAt(0)) code -= 26;
      if (code < 'a'.charCodeAt(0)) code += 26;
      return String.fromCharCode(code);
    }
    return char;
  }).join('');
}

// 凯撒密码解密
function caesarCipher(text, key) {
  return caesarCipher(text, -key);
}

// Base64编码
function base64Encode(text) {
  return Buffer.from(text).toString('base64');
}

// Base64解码
function base64Decode(text) {
  return Buffer.from(text, 'base64').toString('utf-8');
}

// ROT13加密
function rot13(text) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let code = char.charCodeAt(0) + 13;
      if (code > 'z'.charCodeAt(0)) code -= 26;
      if (code < 'a'.charCodeAt(0)) code += 26;
      return String.fromCharCode(code);
    }
    return char;
  }).join('');
}

// ROT13解密
function rot13(text) {
  return rot13(text);
}

// XOR加密
function xorEncrypt(text, key) {
  return text.split('').map((char, index) => {
    return String.fromCharCode(char.charCodeAt(0) ^ key[index % key.length]);
  }).join('');
}

// XOR解密
function xorDecrypt(text, key) {
  return xorEncrypt(text, key);
}

// AES加密
function aesEncrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// AES解密
function aesDecrypt(text, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encrypt, decrypt };