// 加密工具

const crypto = require('crypto');
const fs = require('fs');

const methods = {
  caesar: (text, key) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0);
        code = code >= 65 && code <= 90 ? code + key : code + key - 32;
        code = code > 90 ? code - 26 : code < 65 ? code + 26 : code;
        return String.fromCharCode(code);
      }
      return char;
    }).join('');
  },

  base64: text => {
    return Buffer.from(text).toString('base64');
  },

  rot13: text => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0);
        code = code >= 97 && code <= 122 ? code + 13 : code - 13;
        code = code > 122 ? code - 26 : code < 97 ? code + 26 : code;
        return String.fromCharCode(code);
      }
      return char;
    }).join('');
  },

  xor: text => {
    let key = Buffer.alloc(text.length, 0x5a);
    return Buffer.from(text).concat(key).toString('hex');
  },

  aes: (text, key) => {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
};

const encrypt = (text, method, key, output) => {
  if (!methods[method]) {
    throw new Error('Unsupported method');
  }
  const encryptedText = methods[method](text, key);
  if (output) {
    fs.writeFileSync(output, encryptedText);
  } else {
    console.log(encryptedText);
  }
};

module.exports = { encrypt };