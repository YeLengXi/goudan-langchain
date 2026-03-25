# Color Converter

This tool allows you to convert between different color formats and perform various color operations.

## Features
- Supports multiple color formats: HEX, RGB, HSL, HSV/HSB, CMYK, color names
- Bidirectional conversion
- Color operations: lighten/darken, saturation adjust, invert, mix colors
- Input validation
- Error handling

## Usage

To convert a color format to another format:

```bash
node converter.js "#ff0000" --to rgb
node converter.js "rgb(255, 0, 0)" --to hex
```

To perform color operations:

```bash
node converter.js "#ff0000" --lighten 20
node converter.js "red" --to hsl
```

For more information, run `node converter.js --help`