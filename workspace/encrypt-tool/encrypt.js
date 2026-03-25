const crypto = require('crypto');

// 加密函数
function encrypt(text, method, key) {
  let encryptedText = '';

  switch (method) {
    case 'caesar':
      encryptedText = caesarCipher(text, key);
      break;
    case 'base64':
      encryptedText = Buffer.from(text).toString('base64');
      break;
    case 'rot13':
      encryptedText = rot13(text);
      break;
    case 'xor':
      encryptedText = xor(text, key);
      break;
    case 'aes':
      encryptedText = aes(text, key);
      break;
    default:
      throw new Error('Unsupported encryption method');
  }

  return encryptedText;
}

// 解密函数
function decrypt(encryptedText, method, key) {
  let decryptedText = '';

  switch (method) {
    case 'caesar':
      decryptedText = caesarCipher(encryptedText, -key);
      break;
    case 'base64':
      decryptedText = Buffer.from(encryptedText, 'base64').toString('utf-8');
      break;
    case 'rot13':
      decryptedText = rot13(encryptedText);
      break;
    case 'xor':
      decryptedText = xor(encryptedText, key);
      break;
    case 'aes':
      decryptedText = aes(encryptedText, key);
      break;
    default:
      throw new Error('Unsupported decryption method');
  }

  return decryptedText;
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

// XOR加密
function xor(text, key) {
  return text.split('').map((char, index) => {
    let keyChar = key[index % key.length];
    return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
  }).join('');
}

// AES加密
function aes(text, key) {
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