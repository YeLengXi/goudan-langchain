# 加密工具

这个工具提供多种加密和解密算法，包括凯撒密码、Base64、ROT13、XOR和AES。

## 安装

```bash
npm install
```

## 使用

### 加密

加密文本或文件。

```bash
node encrypt.js "hello world" --method caesar --key 3

node encrypt.js "hello" --method base64

node encrypt.js file.txt --method aes --key mykey --output encrypted.bin

```

### 解密

解密文本或文件。

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt

```

## 加密算法

- 凯撒密码：将字母移动固定位置。
- Base64：将二进制数据转换为ASCII字符。
- ROT13：将字母旋转13个位置。
- XOR：使用密钥进行异或运算。
- AES：高级加密标准。

## 安全提示

⚠️ 注意：这些是教育性质的简单加密
- Caesar/ROT13：仅用于演示
- Base64：编码，不是加密
- XOR：简单加密
- AES：相对安全

不要用于生产环境或敏感数据！