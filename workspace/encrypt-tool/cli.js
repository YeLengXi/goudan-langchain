const readline = require('readline');
const { encrypt, decrypt } = require('./index');
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = async (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const encryptCLI = async () => {
  const text = await ask('Enter text to encrypt: ');
  const method = (await ask('Enter encryption method (caesar, base64, rot13, xor, aes): ')).toLowerCase();
  const key = await ask('Enter key (for aes, leave empty for others): ');
  const output = await ask('Enter output file name (leave empty for console output): ');
  if (output && !path.extname(output)) {
    output += '.bin';
  }
  await encrypt(text, method, key, output);
};

const decryptCLI = async () => {
  const input = await ask('Enter file to decrypt: ');
  const method = (await ask('Enter decryption method (caesar, base64, rot13, xor, aes): ')).toLowerCase();
  const key = await ask('Enter key: ');
  const output = await ask('Enter output file name: ');
  if (output && !path.extname(output)) {
    output += '.txt';
  }
  await decrypt(input, method, key, output);
};

rl.on('close', () => {
  rl.close();
});

const startCLI = async () => {
  const command = await ask('Enter command (encrypt, decrypt, exit): ');
  if (command === 'encrypt') {
    await encryptCLI();
  } else if (command === 'decrypt') {
    await decryptCLI();
  } else if (command === 'exit') {
    rl.close();
  } else {
    console.log('Unknown command');
  }
};

startCLI();