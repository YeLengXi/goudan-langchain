## Color Converter

This tool provides a command-line interface for converting between various color formats and performing color operations.

### Features

- Supports multiple color formats: HEX, RGB, HSL, HSV/HSB, CMYK, color names
- Bidirectional conversion
- Color operations: lighten/darken, saturation adjust, invert, mix colors
- Input validation
- Error handling

### Usage

Convert color formats:

```bash
node converter.js '#ff0000' --to rgb
node converter.js 'rgb(255, 0, 0)' --to hex
```