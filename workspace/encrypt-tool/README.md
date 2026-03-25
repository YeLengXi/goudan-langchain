# 使用文档

## 简介

本工具提供多种文本加密和解密功能，包括凯撒密码、Base64编码、ROT13、XOR加密和AES加密。

## 安装

确保你的环境中已安装Node.js。

## 使用方法

### 加密

```bash
node encrypt.js "hello world" --method caesar --key 3

# 使用Base64编码
node encrypt.js "hello" --method base64

# 使用AES加密
node encrypt.js file.txt --method aes --key mykey --output encrypted.bin

```

### 解密

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt

```

## 加密方法

- `caesar`：凯撒密码加密
- `base64`：Base64编码
- `rot13`：ROT13加密
- `xor`：XOR加密
- `aes`：AES加密

## 参数

- `--method`：指定加密或解密方法
- `--key`：指定加密密钥（对于某些加密方法，如AES，这是必需的）
- `--output`：指定输出文件路径（对于加密操作，这是可选的）

## 注意

- 本工具提供的加密方法仅为演示目的，不应用于生产环境或敏感数据。
- AES加密需要提供密钥，其他加密方法可能不需要。
- 对于加密操作，如果未指定输出文件路径，则输出到控制台。

