# color-converter

This tool provides a simple color converter that supports various color formats and operations.

## Features

- Supports multiple color formats: HEX, RGB, HSL, HSV/HSB, CMYK, color names
- Bidirectional conversion
- Color operations: lighten, darken, saturate, desaturate, invert, mix
- Input validation
- Error handling

## Usage

To convert a color, use the following format:

```bash
node converter.js "color" --to "format"
```

Where `color` is the color you want to convert and `format` is the format you want to convert to.

Example:

```bash
node converter.js "#ff0000" --to "rgb"
```

To perform color operations, use the following format:

```bash
node converter.js "color" --operation "operation" --amount "amount"
```

Where `color` is the color you want to operate on, `operation` is the operation you want to perform, and `amount` is the amount of the operation.

Example:

```bash
node converter.js "#ff0000" --lighten "20"
```

## Commands

- `--to`: Specify the target color format
- `--operation`: Specify the color operation
- `--amount`: Specify the amount of the operation