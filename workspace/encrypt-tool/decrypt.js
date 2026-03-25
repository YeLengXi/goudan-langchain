# 解密工具 - decrypt.js

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const methods = {
  caesar: (text, key) => {
    return text.split('').map((char) => {
      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0) - key;
        if (code < 'a'.charCodeAt(0)) code += 26;
        if (code > 'z'.charCodeAt(0)) code -= 26;
        return String.fromCharCode(code);
      }
      return char;
    }).join('');
  },
  base64: (text) => {
    return Buffer.from(text, 'base64').toString('utf8');
  },
  rot13: (text) => {
    return text.split('').map((char) => {
      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0) - 13;
        if (code < 'a'.charCodeAt(0)) code += 26;
        if (code > 'z'.charCodeAt(0)) code -= 26;
        return String.fromCharCode(code);
      }
      return char;
    }).join('');
  },
  xor: (text, key) => {
    let binary = text.split('').map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
    let keyBinary = key.split('').map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
    let resultBinary = binary.split('').map((bit, index) => {
      return (parseInt(bit, 2) ^ parseInt(keyBinary[index % keyBinary.length], 2)).toString(2).padStart(8, '0');
    }).join('');
    return parseInt(resultBinary, 2).toString(16);
  },
  aes: (text, key) => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
};

const args = process.argv.slice(2);

const [command, encryptedText, method, key, output] = args;

if (command === 'decrypt') {
  if (!encryptedText || !method) {
    console.error('请提供加密文本和加密方法。');
    process.exit(1);
  }

  if (method === 'aes' && !key) {
    console.error('AES解密需要提供密钥。');
    process.exit(1);
  }

  if (output) {
    fs.writeFileSync(output, methods[method](encryptedText, method === 'aes' ? key : null));
    console.log(`文件已解密到 ${output}`);
  } else {
    console.log(methods[method](encryptedText, method === 'aes' ? key : null));
  }
} else {
  console.error('无效的命令。');
  process.exit(1);
}