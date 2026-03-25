# workspace/encrypt-tool/README.md

## 安装

```bash
npm install
```

## 使用

### 加密

```bash
node encrypt.js "hello world" --method caesar --key 3
node encrypt.js "hello" --method base64
node encrypt.js file.txt --method aes --key mykey --output encrypted.bin
```

### 解密

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt
```

## 参数

- --method: 加密或解密方法
  - caesar: 凯撒密码
  - base64: Base64编码
  - rot13: ROT13编码
  - xor: XOR加密
  - aes: AES加密
- --key: 密钥，仅用于AES加密
- --output: 输出文件名，仅用于文件加密和解密

## 示例

加密文本：
hello world

加密方法：
caesar

密钥：
3

加密后的文本：
khoor zruog

解密文本：
khoor zruog

解密方法：
caesar

密钥：
3

解密后的文本：
hello world