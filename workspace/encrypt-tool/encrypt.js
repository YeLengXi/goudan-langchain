const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const methods = {
  caesar: (text, key) => {
    return text.split('').map((char) => {
      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0) + key;
        if (code > 'z'.charCodeAt(0)) code -= 26;
        if (code < 'a'.charCodeAt(0)) code += 26;
        return String.fromCharCode(code);
      }
      return char;
    }).join('');
  },
  base64: (text) => {
    return Buffer.from(text).toString('base64');
  },
  rot13: (text) => {
    return text.split('').map((char) => {
      if (char.match(/[a-z]/i)) {
        let code = char.charCodeAt(0) + 13;
        if (code > 'z'.charCodeAt(0)) code -= 26;
        if (code < 'a'.charCodeAt(0)) code += 26;
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
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
};

const args = process.argv.slice(2);

const [command, text, method, key, output] = args;

if (command === 'encrypt') {
  if (!text || !method) {
    console.error('请提供文本和加密方法。');
    process.exit(1);
  }

  if (method === 'aes' && !key) {
    console.error('AES加密需要提供密钥。');
    process.exit(1);
  }

  if (method === 'aes' && output) {
    fs.writeFileSync(output, methods[method](text, key));
    console.log(`文件已加密到 ${output}`);
  } else {
    console.log(methods[method](text, method === 'aes' ? key : null));
  }
} else {
  console.error('无效的命令。');
  process.exit(1);
}