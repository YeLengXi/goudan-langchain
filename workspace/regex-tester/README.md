# Regex Tester

This tool is a regex tester and debugger. It allows you to test regex patterns, extract capture groups, replace text, split text, and validate common patterns like email, phone number, URL, IP address, and date format.

## Usage

To use the tool, run the following command:

```bash
node tester.js <pattern> --<option> <value>
```

Where <pattern> is the regex pattern you want to test, <option> is the option you want to use (match, capture, replace, split, email, phone, url, ip, date), and <value> is the value you want to test.

## Options

- match: Test if the pattern matches the text.
- capture: Extract capture groups from the text.
- replace: Replace matched text with a specified value.
- split: Split the text by the pattern.
- email: Validate email address.
- phone: Validate phone number.
- url: Validate URL.
- ip: Validate IP address.
- date: Validate date format.

## Examples

```bash
$ node tester.js "/\d+/" --text "hello 123 world"
Pattern: /\d+/
Text: hello 123 world
Match: 123
Position: 6-9

$ node tester.js --email "test@example.com"
Pattern: /^[\w\.-]+@[\w\.-]+\.[a-z]{2,6}$/
Input: test@example.com
Valid: ✅ true
```