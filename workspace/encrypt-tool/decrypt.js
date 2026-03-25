const { encrypt, decrypt } = require('./encrypt');
const fs = require('fs');
const path = require('path');

const encryptFile = (filePath, method, key, output) => {
  const text = fs.readFileSync(filePath, 'utf8');
  const encryptedText = encrypt(text, method, key);
  fs.writeFileSync(output, encryptedText, 'utf8');
};

const decryptFile = (filePath, method, key, output) => {
  const encryptedText = fs.readFileSync(filePath, 'utf8');
  const decryptedText = decrypt(encryptedText, method, key);
  fs.writeFileSync(output, decryptedText, 'utf8');
};

const parseArgs = (args) => {
  const result = {
    method: args[2],
    key: args[4] || '',
    output: args[6] || ''
  };

  if (result.method === 'aes' && !result.key) {
    throw new Error('AES加密需要提供密钥');
  }

  return result;
};

const main = () => {
  const args = parseArgs(process.argv);

  if (args.method === 'aes') {
    if (args.output) {
      encryptFile(args.input, args.method, args.key, args.output);
      console.log('文件加密成功');
    } else {
      decryptFile(args.input, args.method, args.key, args.output);
      console.log('文件解密成功');
    }
  } else {
    console.log('未提供文件路径');
  }
};

main();