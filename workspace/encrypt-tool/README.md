# decrypt.js

This script provides decryption functionalities using various algorithms.

### Usage

node decrypt.js "encrypted_text" --method <method> [--key <key>] [--output <output>]

Options:

  --method  The decryption method to use (aes)
  --key     The key for the decryption method (required for aes)
  --output  The output file path (optional)

### Examples

node decrypt.js encrypted.bin --method aes --key mykey --output decrypted.txt