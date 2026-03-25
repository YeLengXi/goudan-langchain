const fs = require('fs');
const { encrypt, decrypt } = require('./encrypt');

// 解密函数
function decrypt(encryptedText, method, key, output) {
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
      decryptedText = aesDecrypt(encryptedText, key);
      break;
    default:
      throw new Error('Unsupported decryption method');
  }

  fs.writeFileSync(output, decryptedText);
}

// 主函数
function main(args) {
  const method = args.method;
  const key = args.key ? args.key : '';
  const input = args.input;
  const output = args.output ? args.output : input;

  if (!method || !input) {
    console.error('Missing arguments');
    return;
  }

  let encryptedText = fs.readFileSync(input, 'utf-8');
  decrypt(encryptedText, method, key, output);
}

// 运行主函数
if (require.main === module) {
  main(process.argv.slice(2));
}