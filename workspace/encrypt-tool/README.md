# encrypt-tool

This tool provides a simple text encryption and decryption utility with multiple encryption algorithms.

## Features

- Multiple encryption algorithms: Caesar Cipher, Base64, ROT13, Simple XOR, AES
- File encryption/decryption
- Key management
- Error handling
- Security warnings

## Usage

### Encryption

```bash
node encrypt.js "hello world" --method caesar --key 3
node encrypt.js "hello" --method base64
node encrypt.js file.txt --method aes --key mykey --output encrypted.bin
```

### Decryption

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt
```