const fs = require('fs');
const path = require('path');
const { caesarCipher, base64Encode, rot13, xorEncrypt, aesEncrypt } = require('./encrypt');

const args = process.argv.slice(2);
const [text, method, key, output] = args;

if (!text) {
  console.error('Error: No text provided for encryption.');
  process.exit(1);
}

if (!method) {
  console.error('Error: No encryption method provided.');
  process.exit(1);
}

let encryptedText = '';

switch (method) {
  case 'caesar':
    encryptedText = caesarCipher(text, parseInt(key, 10));
    break;
  case 'base64':
    encryptedText = base64Encode(text);
    break;
  case 'rot13':
    encryptedText = rot13(text);
    break;
  case 'xor':
    encryptedText = xorEncrypt(text, key);
    break;
  case 'aes':
    encryptedText = aesEncrypt(text, key);
    break;
  default:
    console.error('Error: Unknown encryption method.');
    process.exit(1);
}

if (output) {
  fs.writeFileSync(output, encryptedText);
  console.log(`Encrypted text written to ${output}`);
} else {
  console.log(encryptedText);
}