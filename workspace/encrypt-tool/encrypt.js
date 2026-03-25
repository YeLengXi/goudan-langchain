const crypto = require('crypto');

// 加密函数
function encrypt(text, method, key) {
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
      throw new Error('未知加密方法');
  }
}

// 解密函数
function decrypt(encryptedText, method, key) {
  switch (method) {
    case 'caesar':
      return caesarCipher(encryptedText, key, true);
    case 'base64':
      return base64Decode(encryptedText);
    case 'rot13':
      return rot13(encryptedText, true);
    case 'xor':
      return xorEncrypt(encryptedText, key, true);
    case 'aes':
      return aesDecrypt(encryptedText, key);
    default:
      throw new Error('未知加密方法');
  }
}

// 凯撒密码加密
function caesarCipher(text, key, decrypt = false) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char.match(/[a-z]/i)) {
      let offset = decrypt ? -key : key;
      char = String.fromCharCode((char.charCodeAt(0) + offset - 65) % 26 + 65);
    }
    result += char;
  }
  return result;
}

// Base64编码
function base64Encode(text) {
  return Buffer.from(text).toString('base64');
}

// Base64解码
function base64Decode(text) {
  return Buffer.from(text, 'base64').toString();
}

// ROT13加密
function rot13(text, decrypt = false) {
  return text.replace(/[a-zA-Z]/g, function(c) {
    let code = c.charCodeAt(0);
    let offset = decrypt ? 13 : -13;
    return String.fromCharCode(((code - 65 + offset) % 26) + 65) || ((code - 97 + offset) % 26) + 97);
  });
}

// XOR加密
function xorEncrypt(text, key, decrypt = false) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let keyChar = key[i % key.length];
    let xorResult = char ^ keyChar.charCodeAt(0);
    result += String.fromCharCode(xorResult);
  }
  return result;
}

// AES加密
function aesEncrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// AES解密
function aesDecrypt(encryptedText, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encrypt, decrypt };