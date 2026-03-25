const { encrypt, decrypt } = require('./encrypt-tool/encrypt.js');

// 解密函数
function decrypt(encryptedText, method, key) {
  switch (method) {
    case 'caesar':
      return caesarCipher(encryptedText, -key);
    case 'base64':
      return base64Decode(encryptedText);
    case 'rot13':
      return rot13(encryptedText, -13);
    case 'xor':
      return xor(encryptedText, key);
    case 'aes':
      return aesDecrypt(encryptedText, key);
    default:
      throw new Error('Unsupported decryption method');
  }
}

// 凯撒密码解密
function caesarCipher(text, key) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let code = char.charCodeAt(0) - key;
      if (code < 'a'.charCodeAt(0)) code += 26;
      if (code > 'z'.charCodeAt(0)) code -= 26;
      return String.fromCharCode(code);
    }
    return char;
  }).join('');
}

// Base64解码
function base64Decode(text) {
  return Buffer.from(text, 'base64').toString();
}

// ROT13解密
function rot13(text) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let code = char.charCodeAt(0) - 13;
      if (code < 'a'.charCodeAt(0)) code += 26;
      if (code > 'z'.charCodeAt(0)) code -= 26;
      return String.fromCharCode(code);
    }
    return char;
  }).join('');
}

// XOR解密
function xor(encryptedText, key) {
  return encryptedText.split('').map((char, index) => {
    const keyChar = key[index % key.length];
    return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
  }).join('');
}

// AES解密
function aesDecrypt(encryptedText, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { decrypt };