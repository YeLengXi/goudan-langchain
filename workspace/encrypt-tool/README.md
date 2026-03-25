# Text Encryption and Decryption Tool

## Description
This tool provides basic encryption and decryption capabilities using various algorithms such as Caesar Cipher, Base64, ROT13, Simple XOR, and AES.

## Features
- Multiple encryption algorithms
- File encryption and decryption
- Key management
- Error handling
- Security warnings

## Usage

### Encrypt

```bash
node encrypt.js "hello world" --method caesar --key 3
node encrypt.js "hello" --method base64
node encrypt.js file.txt --method aes --key mykey --output encrypted.bin
```

### Decrypt

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt
```