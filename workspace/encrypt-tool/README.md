## 使用文档

### 加密工具 - encrypt.js

加密文本或文件使用以下命令：

```bash
node encrypt.js "要加密的文本" --method caesar --key 3

# 加密文件
node encrypt.js file.txt --method aes --key mykey --output encrypted.bin

``` 

支持的加密方法：

- caesar: 凯撒密码
- base64: Base64编码
- rot13: ROT13编码
- xor: 简单XOR加密
- aes: AES加密

### 解密工具 - decrypt.js

解密文件使用以下命令：

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt

```

支持的加密方法：

- caesar: 凯撒密码
- base64: Base64编码
- rot13: ROT13编码
- xor: 简单XOR加密
- aes: AES加密