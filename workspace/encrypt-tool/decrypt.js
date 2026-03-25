const encrypt = require('./encrypt');

// Caesar Cipher
function caesarCipher(text, key) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let charCode = char.charCodeAt(0);
      charCode = charCode >= 65 && charCode <= 90 ? charCode - 65 + key : charCode - 97 + key;
      charCode = charCode > 90 ? charCode - 26 : charCode < 65 ? charCode + 26 : charCode;
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
      let charCode = char.charCodeAt(0);
      charCode = charCode >= 65 && charCode <= 90 ? charCode - 65 + 13 : charCode - 97 + 13;
      charCode = charCode > 90 ? charCode - 26 : charCode < 65 ? charCode + 26 : charCode;
      return String.fromCharCode(charCode);
    }
    return char;
  }).join('');
}

// Simple XOR Encryption
function xorEncrypt(text, key) {
  return text.split('').map((char, index) => char.charCodeAt(0) ^ key.charCodeAt(index % key.length)).map(charCode => String.fromCharCode(charCode)).join('');
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