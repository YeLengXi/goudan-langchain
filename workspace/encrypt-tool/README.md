# 文本加密解密工具

这是一个简单的文本加密解密工具，支持多种加密算法。

## 安装

确保你已经安装了Node.js。

## 使用方法

- 加密文本
  node encrypt.js "hello world" --method caesar --key 3

- 加密文件
  node encrypt.js file.txt --method aes --key mykey --output encrypted.bin

- 解密文件
  node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt

## 加密算法

- Caesar Cipher（凯撒密码）
- Base64编码
- ROT13
- 简单XOR加密
- AES加密

## 注意

- Caesar/ROT13：仅用于演示
- Base64：编码，不是加密
- XOR：简单加密
- AES：相对安全

不要用于生产环境或敏感数据！