const { program } = require('commander');

program.version('1.0.0');

program.command('encrypt')
  .argument('<text>', 'Text to encrypt')
  .option('--method <method>', 'Encryption method (caesar, base64, rot13, xor, aes)', 'caesar')
  .option('--key <key>', 'Encryption key', '')
  .option('--output <output>', 'Output file path', '')
  .action((text, options) => {
    const encrypted = encrypt(text, options.method, options.key);
    if (options.output) {
      fs.writeFileSync(options.output, encrypted);
      console.log(`Encrypted text written to ${options.output}`);
    } else {
      console.log(encrypted);
    }
  });

program.command('decrypt')
  .argument('<input>', 'Input file path')
  .option('--method <method>', 'Decryption method (caesar, base64, rot13, xor, aes)', 'aes')
  .option('--key <key>', 'Decryption key', '')
  .option('--output <output>', 'Output file path', '')
  .action((input, options) => {
    const decrypted = decrypt(fs.readFileSync(input, 'utf-8'), options.method, options.key);
    if (options.output) {
      fs.writeFileSync(options.output, decrypted);
      console.log(`Decrypted text written to ${options.output}`);
    } else {
      console.log(decrypted);
    }
  });

program.parse(process.argv);