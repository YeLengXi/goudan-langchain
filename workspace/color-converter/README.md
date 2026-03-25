# color-converter

This repository provides a color conversion tool that supports various color formats.

## Features

- Supports multiple color formats
- Bidirectional conversion
- Color operations (lighten, darken, saturation adjustment, reverse, mix)
- Input validation
- Error handling

## Usage

To use the color conversion tool, run the following commands in the terminal:

```bash
node converter.js <color> --to <format>
node converter.js <color> --lighten <percentage>
node converter.js <color> --to <format>
node converter.js <color> --to <format>
```

Replace `<color>` with the color you want to convert and `<format>` with the desired output format.

For example:

```bash
$ node converter.js #ff0000 --to rgb
Input: #ff0000
Output: rgb(255, 0, 0)

$ node converter.js #ff0000 --lighten 20
Input: #ff0000
Output: #ff6666 (20% lighter)
```