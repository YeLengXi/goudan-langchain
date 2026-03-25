# Text Encryption and Decryption Tool

This tool provides a simple command-line interface for encrypting and decrypting text using various encryption algorithms.

## Features

- Multiple encryption algorithms: Caesar Cipher, Base64, ROT13, Simple XOR, AES
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

## Security Warnings

⚠️ Note: These are educational simple ciphers
- Caesar/ROT13: Only for demonstration
- Base64: Encoding, not encryption
- XOR: Simple encryption
- AES: Relatively secure

Do not use for production environments or sensitive data!
