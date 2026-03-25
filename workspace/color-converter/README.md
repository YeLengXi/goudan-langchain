# color-converter

This tool is a color converter that supports various color formats for conversion.

## Features

- Supports multiple color formats
- Bi-directional conversion
- Color operations (lighten/darken, saturation adjustment, inverse, color mixing)
- Input validation
- Error handling

## Usage

To convert a color format to another, use the following command:

```bash
node converter.js <input> --to <format>
```

Where <input> is the color you want to convert and <format> is the format you want to convert to.

### Examples

Convert #ff0000 to rgb:
```bash
node converter.js #ff0000 --to rgb
```

Convert rgb(255, 0, 0) to hex:
```bash
node converter.js rgb(255, 0, 0) --to hex
```