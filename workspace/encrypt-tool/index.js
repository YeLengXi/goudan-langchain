const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const fs = require('fs');
const path = require('path');
const { caesarCipher, base64Encode, rot13, xorEncrypt, aesEncrypt, caesarDecrypt, base64Decode, rot13Decrypt, xorDecrypt, aesDecrypt } = require('./encrypt');
const { caesarDecrypt, base64Decode, rot13Decrypt, xorDecrypt, aesDecrypt } = require('./decrypt');

const args = yargs(hideBin(process.argv)).argv;

function encrypt(text, method, key, output) {
  switch (method) {
    case 'caesar':
      return caesarCipher(text, parseInt(key));
    case 'base64':
      return base64Encode(text);
    case 'rot13':
      return rot13(text);
    case 'xor':
      return xorEncrypt(text, key);
    case 'aes':
      return aesEncrypt(text, key);
    default:
      throw new Error('Unknown encryption method');
  }
}

function decrypt(file, method, key, output) {
  const content = fs.readFileSync(file, 'utf8');
  switch (method) {
    case 'caesar':
      return caesarDecrypt(content, parseInt(key));
    case 'base64':
      return base64Decode(content);
    case 'rot13':
      return rot13Decrypt(content);
    case 'xor':
      return xorDecrypt(content, key);
    case 'aes':
      return aesDecrypt(content, key);
    default:
      throw new Error('Unknown decryption method');
  }
}

if (args._[0] === 'encrypt') {
  const text = args.text || fs.readFileSync(args.file, 'utf8');
  const method = args.method;
  const key = args.key || null;
  const output = args.output || null;

  try {
    const encrypted = encrypt(text, method, key, output);
    if (output) {
      fs.writeFileSync(output, encrypted);
    } else {
      console.log(encrypted);
    }
  } catch (error) {
    console.error(error.message);
  }
} else if (args._[0] === 'decrypt') {
  const file = args.file;
  const method = args.method;
  const key = args.key;
  const output = args.output || null;

  try {
    const decrypted = decrypt(file, method, key, output);
    if (output) {
      fs.writeFileSync(output, decrypted);
    } else {
      console.log(decrypted);
    }
  } catch (error) {
    console.error(error.message);
  }
}