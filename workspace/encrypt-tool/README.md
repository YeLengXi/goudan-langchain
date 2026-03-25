# 加密工具

本工具提供多种文本加密和解密功能。

### 加密算法

- 凯撒密码 (Caesar Cipher)
  通过将每个字母移动固定数目的位置来加密文本。
- Base64编码
  将文本转换为Base64编码。
- ROT13
  将每个字母旋转13个位置进行加密。
- 简单XOR加密
  使用密钥对文本进行XOR加密。
- AES加密
  使用AES算法进行加密，需要密钥。

### 使用示例

- 加密文本：`node encrypt.js "hello world" --method caesar --key 3`
- 解密文件：`node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt`

