/**
 * 正则表达式测试器
 */
const { program } = require('commander');
const { match, capture, replace, split, validateEmail, validatePhone, validateUrl, validateIp, validateDate } = require('./utils');

program
  .version('1.0.0')
  .command('match <pattern> <text>', '测试匹配')
  .option('--text <text>', '要测试的文本')
  .action((pattern, options) => {
    console.log(`Pattern: ${pattern}`);
    console.log(`Text: ${options.text}`);
    const result = match(pattern, options.text);
    console.log(`Match: ${result.match}`);
    console.log(`Position: ${result.position}`);
  });

program
  .command('capture <pattern> <text>', '提取捕获组')
  .option('--text <text>', '要测试的文本')
  .action((pattern, options) => {
    console.log(`Pattern: ${pattern}`);
    console.log(`Text: ${options.text}`);
    const result = capture(pattern, options.text);
    console.log('Captures:', result.captures);
  });

program
  .command('replace <pattern> <replacement> <text>', '正则替换')
  .option('--text <text>', '要替换的文本')
  .option('--with <with>', '替换为')
  .action((pattern, replacement, options) => {
    console.log(`Pattern: ${pattern}`);
    console.log(`Text: ${options.text}`);
    const result = replace(pattern, replacement, options.text);
    console.log(`Result: ${result}`);
  });

program
  .command('split <pattern> <text>', '分割文本')
  .option('--text <text>', '要分割的文本')
  .action((pattern, options) => {
    console.log(`Pattern: ${pattern}`);
    console.log(`Text: ${options.text}`);
    const result = split(pattern, options.text);
    console.log('Result:', result);
  });

program
  .command('email <email>', '验证邮箱')
  .action((email) => {
    console.log(`Pattern: ${validateEmail()}`);
    console.log(`Input: ${email}`);
    console.log(`Valid: ✅ ${validateEmail(email)}`);
  });

program
  .command('phone <phone>', '验证手机号')
  .action((phone) => {
    console.log(`Pattern: ${validatePhone()}`);
    console.log(`Input: ${phone}`);
    console.log(`Valid: ✅ ${validatePhone(phone)}`);
  });

program
  .command('url <url>', '验证URL')
  .action((url) => {
    console.log(`Pattern: ${validateUrl()}`);
    console.log(`Input: ${url}`);
    console.log(`Valid: ✅ ${validateUrl(url)}`);
  });

program
  .command('ip <ip>', '验证IP地址')
  .action((ip) => {
    console.log(`Pattern: ${validateIp()}`);
    console.log(`Input: ${ip}`);
    console.log(`Valid: ✅ ${validateIp(ip)}`);
  });

program
  .command('date <date>', '验证日期格式')
  .action((date) => {
    console.log(`Pattern: ${validateDate()}`);
    console.log(`Input: ${date}`);
    console.log(`Valid: ✅ ${validateDate(date)}`);
  });

program.parse(process.argv);