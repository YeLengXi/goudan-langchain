# 文本加密解密工具

这是一个简单的文本加密解密工具，支持多种加密算法。

## 安装

确保你已经安装了Node.js和npm。

使用npm安装依赖：

```bash
npm install
```

## 使用

### 加密

加密文本：

```bash
node encrypt.js "hello world" --method caesar --key 3
```

加密文件：

```bash
node encrypt.js file.txt --method aes --key mykey --output encrypted.bin
```

### 解密

解密文本：

```bash
node decrypt.js "hello world" --method caesar --key 3
```

解密文件：

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt
```