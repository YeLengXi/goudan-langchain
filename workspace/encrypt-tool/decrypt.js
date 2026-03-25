const fs = require('fs');
const { encrypt, decrypt } = require('./encrypt');

// 解密函数
function decrypt(encryptedText, method, key) {
    switch (method) {
        case 'caesar':
            return caesarCipherDec(encryptedText, key);
        case 'base64':
            return base64Decode(encryptedText);
        case 'rot13':
            return rot13(encryptedText);
        case 'xor':
            return xorDecrypt(encryptedText, key);
        case 'aes':
            return aesDecrypt(encryptedText, key);
        default:
            throw new Error('未知加密方法');
    }
}

// 读取文件内容
function readFileContent(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// 写入文件内容
function writeFileContent(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
}

// 加密文件
function encryptFile(inputFilePath, outputFilePath, method, key) {
    const content = readFileContent(inputFilePath);
    const encryptedContent = encrypt(content, method, key);
    writeFileContent(outputFilePath, encryptedContent);
}

// 解密文件
function decryptFile(inputFilePath, outputFilePath, method, key) {
    const encryptedContent = readFileContent(inputFilePath);
    const decryptedContent = decrypt(encryptedContent, method, key);
    writeFileContent(outputFilePath, decryptedContent);
}

module.exports = { decrypt, encryptFile, decryptFile };