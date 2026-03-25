const { caesarCipher, base64Encode, rot13, xorEncrypt, aesEncrypt } = require('./encrypt');

// Caesar Cipher
function caesarDecipher(text, key) {
  return caesarCipher(text, -key);
}

// Base64 Decoding
function base64Decode(text) {
  return Buffer.from(text, 'base64').toString('utf8');
}

// ROT13
function rot13Decipher(text) {
  return rot13(text);
}

// Simple XOR Decryption
function xorDecrypt(text, key) {
  return xorEncrypt(text, key);
}

// AES Decryption
function aesDecrypt(text, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {
  caesarDecipher,
  base64Decode,
  rot13Decipher,
  xorDecrypt,
  aesDecrypt
};