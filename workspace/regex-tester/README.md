# Regex Tester

This is a simple regex tester tool that allows you to test regex patterns, extract capture groups, replace text, and validate common patterns like email, phone, URL, IP address, and date format.

## Usage

To use the tool, run the following command:

```bash
node tester.js <command> <options>
```

### Commands

- `testRegex` - Test a regex pattern against some text.
    - `--regex <pattern>` - The regex pattern to test.
    - `--text <text>` - The text to test against.

- `testEmail` - Validate an email address.
    - `--email <email>` - The email address to validate.

- `testPhone` - Validate a phone number.
    - `--phone <phone>` - The phone number to validate.

- `testUrl` - Validate a URL.
    - `--url <url>` - The URL to validate.

- `replaceText` - Replace text using a regex pattern.
    - `--regex <pattern>` - The regex pattern to use for replacement.
    - `--text <text>` - The text to replace.
    - `--with <replacement>` - The replacement text.

## Examples

```bash
# Test regex pattern
node tester.js testRegex --regex "/\d+/" --text "hello 123 world"

# Validate email address
node tester.js --email "test@example.com"

# Validate phone number
node tester.js --phone "13800138000"

# Validate URL
node tester.js --url "https://example.com"

# Replace text
node tester.js replace --regex "/\s+/g" --text "hello   world" --with "+"
```