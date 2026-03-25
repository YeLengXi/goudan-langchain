# Regex Tester

This tool allows you to test and debug regular expressions.

## Usage

To test a regular expression, run:

    node tester.js <regex> --text <text>

To validate an email, run:

    node tester.js --email <email>

To validate a phone number, run:

    node tester.js --phone <phone>

To validate a URL, run:

    node tester.js --url <url>

To validate an IP address, run:

    node tester.js --ip <ip>

To validate a date format, run:

    node tester.js --date <date>

## Examples

To test a regex pattern:

    node tester.js "/\d+/" --text "hello 123 world"

To validate an email:

    node tester.js --email "test@example.com"