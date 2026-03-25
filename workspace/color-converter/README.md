# Color Converter

This tool is a color converter that supports various color formats and operations.

## Features

- Supports multiple color formats (HEX, RGB, HSL, HSV/HSB, CMYK, color names)
- Bidirectional conversion
- Color operations (lighten, darken, saturate, desaturate, invert, mix)
- Input validation
- Error handling

## Usage

To use this tool, run the following commands:

```bash
node converter.js '#ff0000' --to rgb
node converter.js 'rgb(255, 0, 0)' --to hex
node converter.js '#ff0000' --lighten 20
node converter.js 'red' --to hsl
```

For more detailed information, please refer to the [converter.js file](./converter.js).
