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
node decrypt.js encrypted_text --method caesar --key 3
```

To encrypt a file:

```bash
node encrypt.js file.txt --method aes --key mykey --output encrypted.bin
```

To decrypt a file:

```bash
node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt
```

## Security Tips

⚠️ Note: These are educational simple ciphers.
- Caesar/ROT13: Only for demonstration
- Base64: Encoding, not encryption
- XOR: Simple encryption
- AES: Relatively secure

Do not use in production environments or with sensitive data!