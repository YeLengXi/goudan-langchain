const { exec } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { listDirectory } = require('./utils');

const usage = "Usage: node tester.js <pattern> [options]\n\nOptions:\n  --text <text>    Test regex against text\n  --email <email>   Validate email\n  --phone <phone>   Validate phone number\n  --url <url>       Validate URL\n  --ip <ip>         Validate IP address\n  --date <date>     Validate date format\n  --replace <regex> Replace text\n  --with <replacement>\n"

const patterns = {
  email: "^[\^\s@]+@[\^\s@]+\.[\^\s@]+$",
  phone: "^1[3-9]\d{9}$",
  url: "^https?://[a-z0-9]+(\.[a-z0-9]+)+([/?][^\s]*)?$",
  ip: "^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$",
  date: "^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$"
};

function testRegex(pattern, options) {
  if (!pattern) {
    console.error('Pattern is required');
    return;
  }

  const regex = new RegExp(pattern);
  if (options.text) {
    const matches = regex.exec(options.text);
    if (matches) {
      console.log(`Pattern: ${pattern}
Text: ${options.text}
Match: ${matches[0]}
Position: ${matches.index}-${matches.index + matches[0].length - 1}
`);
    } else {
      console.log(`Pattern: ${pattern}
Text: ${options.text}
No match found
`);
    }
  }

  if (options.email) {
    const valid = regex.test(options.email);
    console.log(`Pattern: ${pattern}
Input: ${options.email}
Valid: ✅ ${valid}
`);
  }

  // Add more test cases here
}

module.exports = { testRegex };