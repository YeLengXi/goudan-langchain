const fs = require('fs');
const { encrypt, decrypt } = require('./encrypt');

// 解密函数
function decrypt(encryptedText, method, key, output) {
    try {
        const decryptedText = decrypt(encryptedText, method, key);
        fs.writeFileSync(output, decryptedText);
        console.log('解密成功，输出文件：', output);
    } catch (error) {
        console.error('解密失败：', error);
    }
}

// 加密函数
function encrypt(text, method, key, output) {
    try {
        const encryptedText = encrypt(text, method, key);
        fs.writeFileSync(output, encryptedText);
        console.log('加密成功，输出文件：', output);
    } catch (error) {
        console.error('加密失败：', error);
    }
}

// 处理命令行参数
function handleArgs(args) {
    const { method, text, key, output } = args;
    if (!method || !text) {
        console.error('缺少必要的参数：method 和 text');
        return;
    }
    if (method === 'aes' && !key) {
        console.error('AES加密需要key参数');
        return;
    }
    if (method === 'aes' && !output) {
        console.error('需要指定输出文件');
        return;
    }
    if (method === 'file' && !output) {
        console.error('需要指定输出文件');
        return;
    }
    if (method === 'file' && text.includes(' ')) {
        console.error('文件名不能包含空格');
        return;
    }
    if (method === 'file' && fs.existsSync(text)) {
        const data = fs.readFileSync(text, 'utf-8');
        text = data;
    }
    if (method === 'aes' && key.length < 32) {
        key = key.padEnd(32, '0');
    }
    encrypt(text, method, key, output);
}

// 主函数
function main() {
    const args = process.argv.slice(2);
    handleArgs(args);
}

main();