# Regex Tester

This tool is a regex tester and debugger. It allows you to test regular expressions, extract capture groups, replace text, split text, and validate common patterns like email, phone number, URL, IP address, and date format.

## Usage

To use the tool, run the following command:

```bash
node tester.js "/\d+/" --text "hello 123 world"
node tester.js --email "test@example.com"
node tester.js --phone "13800138000"
node tester.js --url "https://example.com"
node tester.js replace "/\s+/g" --text "hello   world" --with "+"
```

## Features

- Test regular expressions
- Show match results
- Extract capture groups
- Regular expression replacement
- Common regex libraries
- Error handling

## CLI Interface

```bash
node tester.js "/\d+/" --text "hello 123 world"
node tester.js --email "test@example.com"
node tester.js --phone "13800138000"
node tester.js --url "https://example.com"
node tester.js replace "/\s+/g" --text "hello   world" --with "+"
```