const fs = require('fs');
const read_file = require('./read_file');
const write_file = require('./write_file');

const crypto = require('crypto');

// 加密算法
function caesarCipher(text, key) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let charCode = char.charCodeAt(0);
      charCode = charCode >= 97 ? charCode - 97 + key : charCode - 65 + key;
      charCode = charCode > 122 ? charCode - 26 : charCode < 97 ? charCode + 26 : charCode;
      return String.fromCharCode(charCode);
    }
    return char;
  }).join('');
}

function base64Encode(text) {
  return Buffer.from(text).toString('base64');
}

function rot13(text) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let charCode = char.charCodeAt(0);
      charCode = charCode >= 97 ? charCode - 97 + 13 : charCode - 65 + 13;
      charCode = charCode > 122 ? charCode - 26 : charCode < 97 ? charCode + 26 : charCode;
      return String.fromCharCode(charCode);
    }
    return char;
  }).join('');
}

function simpleXorEncrypt(text, key) {
  return text.split('').map((char, index) => char.charCodeAt(0) ^ key.charCodeAt(index % key.length)).map(charCode => String.fromCharCode(charCode)).join('');
}

function aesEncrypt(text, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// 解密算法
function caesarCipherDecrypt(text, key) {
  return caesarCipher(text, -key);
}

function base64Decode(text) {
  return Buffer.from(text, 'base64').toString('utf8');
}

function rot13Decrypt(text) {
  return rot13(text, -13);
}

function simpleXorDecrypt(text, key) {
  return text.split('').map((char, index) => char.charCodeAt(0) ^ key.charCodeAt(index % key.length)).map(charCode => String.fromCharCode(charCode)).join('');
}

function aesDecrypt(text, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 文件加密/解密
function encryptFile(inputPath, outputPath, method, key) {
  const text = read_file(inputPath);
  let encryptedText = '';
  switch (method) {
    case 'caesar':
      encryptedText = caesarCipher(text, key);
      break;
    case 'base64':
      encryptedText = base64Encode(text);
      break;
    case 'rot13':
      encryptedText = rot13(text);
      break;
    case 'xor':
      encryptedText = simpleXorEncrypt(text, key);
      break;
    case 'aes':
      encryptedText = aesEncrypt(text, key);
      break;
  }
  write_file({ content: encryptedText, file_path: outputPath });
}

function decryptFile(inputPath, outputPath, method, key) {
  const encryptedText = read_file(inputPath);
  let decryptedText = '';
  switch (method) {
    case 'caesar':
      decryptedText = caesarCipherDecrypt(encryptedText, key);
      break;
    case 'base64':
      decryptedText = base64Decode(encryptedText);
      break;
    case 'rot13':
      decryptedText = rot13Decrypt(encryptedText);
      break;
    case 'xor':
      decryptedText = simpleXorDecrypt(encryptedText, key);
      break;
    case 'aes':
      decryptedText = aesDecrypt(encryptedText, key);
      break;
  }
  write_file({ content: decryptedText, file_path: outputPath });
}

// CLI接口
const commander = require('commander');
const program = new commander.Command();

program.command('encrypt')
  .argument('<text>', '要加密的文本或文件路径')
  .option('--method <method>', '加密方法', 'caesar')
  .option('--key <key>', '密钥', '')
  .option('--output <output>', '输出文件路径', '')
  .action((args) => {
    if (fs.existsSync(args.text)) {
      encryptFile(args.text, args.output || args.text.replace(/\.txt$/, '.enc'), args.method, args.key);
    } else {
      encryptFile(args.text, args.output || 'encrypted.txt', args.method, args.key);
    }
  });

program.command('decrypt')
  .argument('<text>', '要解密的文本或文件路径')
  .option('--method <method>', '解密方法', 'caesar')
  .option('--key <key>', '密钥', '')
  .option('--output <output>', '输出文件路径', '')
  .action((args) => {
    if (fs.existsSync(args.text)) {
      decryptFile(args.text, args.output || args.text.replace(/\.enc$/, '.txt'), args.method, args.key);
    } else {
      decryptFile(args.text, args.output || 'decrypted.txt', args.method, args.key);
    }
  });

program.parse(process.argv);
