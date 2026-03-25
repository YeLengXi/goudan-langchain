## 加密工具

本工具提供多种加密算法，包括：

- 凯撒密码（Caesar Cipher）
- Base64编码
- ROT13
- 简单XOR加密
- AES加密

## 使用方法

加密：

```bash
node encrypt.js "要加密的文本" --method 加密方法 --key 密钥（如果需要）
```

解密：

```bash
node decrypt.js 加密后的文本 --method 解密方法 --key 密钥
```

## 加密方法

- caesar：凯撒密码，需要指定密钥（位移量）
- base64：Base64编码，不需要密钥
- rot13：ROT13编码，不需要密钥
- xor：XOR加密，需要密钥
- aes：AES加密，需要密钥

## 示例

加密文本：

```bash
node encrypt.js "hello world" --method caesar --key 3
```

解密文本：

```bash
node decrypt.js encrypted.txt --method caesar --key 3
```
