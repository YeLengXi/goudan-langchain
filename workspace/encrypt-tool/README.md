# workspace/encrypt-tool/README.md

# 文本加密解密工具

## 目标
创建一个简单的文本加密解密工具，支持多种加密算法。

## 安装

```bash
npm install
```

## 使用方法

### 加密

```bash
node encrypt.js "hello world" --method caesar --key 3
```

### 解密

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt
```

## 支持的加密算法

- Caesar Cipher（凯撒密码）
- Base64编码
- ROT13
- 简单XOR加密
- AES加密

## 安全提示

⚠️ 注意：这些是教育性质的简单加密
- Caesar/ROT13：仅用于演示
- Base64：编码，不是加密
- XOR：简单加密
- AES：相对安全

不要用于生产环境或敏感数据！