const { encrypt, decrypt } = require('./cli');
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);

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
    const keyArray = key.split('').map((char) => char.charCodeAt(0));
    const textArray = text.split('').map((char) => char.charCodeAt(0));
    const encryptedArray = textArray.map((char, index) => char ^ keyArray[index % keyArray.length]);
    return String.fromCharCode(...encryptedArray);
  },

  aes: (text, key) => {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
};

const decryptMethods = {
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
    const keyArray = key.split('').map((char) => char.charCodeAt(0));
    const textArray = text.split('').map((char) => char.charCodeAt(0));
    const encryptedArray = textArray.map((char, index) => char ^ keyArray[index % keyArray.length]);
    return String.fromCharCode(...encryptedArray);
  },

  aes: (text, key) => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
};

const encrypt = async (text, method, key, output) => {
  try {
    const encryptedText = methods[method](text, key);
    if (output) {
      await writeFile(output, encryptedText);
      console.log(`Encrypted and saved to ${output}`);
    } else {
      console.log(encryptedText);
    }
  } catch (error) {
    console.error('Encryption failed:', error);
  }
};

const decrypt = async (input, method, key, output) => {
  try {
    const encryptedText = await readFile(input, 'utf8');
    const decryptedText = decryptMethods[method](encryptedText, key);
    if (output) {
      await writeFile(output, decryptedText);
      console.log(`Decrypted and saved to ${output}`);
    } else {
      console.log(decryptedText);
    }
  } catch (error) {
    console.error('Decryption failed:', error);
  }
};

module.exports = { encrypt, decrypt };