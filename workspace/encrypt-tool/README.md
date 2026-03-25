# encrypt-tool

This tool provides a simple text encryption and decryption utility with multiple encryption algorithms.

## Features

- Multiple encryption algorithms
- File encryption/decryption
- Key management
- Error handling
- Security tips

## Usage

To encrypt a text:

```bash
node encrypt.js "hello world" --method caesar --key 3
```

To decrypt a text:

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt
```