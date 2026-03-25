const crypto = require('crypto');

// Caesar Cipher
function caesarCipher(text, key) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let charCode = char.charCodeAt(0) + key;
      if (charCode > 'z'.charCodeAt(0)) charCode -= 26;
      if (charCode < 'a'.charCodeAt(0)) charCode += 26;
      return String.fromCharCode(charCode);
    }
    return char;
  }).join('');
}

// Base64 Encoding
function base64Encode(text) {
  return Buffer.from(text).toString('base64');
}

// ROT13
function rot13(text) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let charCode = char.charCodeAt(0) + 13;
      if (charCode > 'z'.charCodeAt(0)) charCode -= 26;
      if (charCode < 'a'.charCodeAt(0)) charCode += 26;
      return String.fromCharCode(charCode);
    }
    return char;
  }).join('');
}

// Simple XOR Encryption
function xorEncrypt(text, key) {
  return text.split('').map((char, index) => char.charCodeAt(0) ^ key[index % key.length]).join('');
}

// AES Encryption
function aesEncrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

module.exports = {
  caesarCipher,
  base64Encode,
  rot13,
  xorEncrypt,
  aesEncrypt
};