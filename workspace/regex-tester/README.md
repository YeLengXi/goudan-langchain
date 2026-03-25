# Regex Tester

This tool allows you to test and debug regular expressions.

## Installation

To use this tool, make sure you have Node.js installed. Then, run the following command in your terminal:

```bash
npm install
```

## Usage

- To test a regex pattern against some text:
  
  ```bash
  node tester.js <pattern> --text <text>
  ```
  
- To validate an email address:
  
  ```bash
  node tester.js --email <email>
  ```
  
- To validate a phone number:
  
  ```bash
  node tester.js --phone <phone>
  ```
  
- To validate a URL:
  
  ```bash
  node tester.js --url <url>
  ```
  
- To replace text using a regex pattern:
  
  ```bash
  node tester.js replace <pattern> --text <text> --with <replacement>
  ```

## Examples

```bash
$ node tester.js "/\d+/" --text "hello 123 world"
Pattern: /\d+/
Text: hello 123 world
Match: 123
Position: 6-9

$ node tester.js --email "test@example.com"
Pattern: ^[\^\s@]+@[\^\s@]+\.[\^\s@]+$
Input: test@example.com
Valid: ✅ true
```