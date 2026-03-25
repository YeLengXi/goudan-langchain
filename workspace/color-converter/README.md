# color-converter

This tool is a color converter that supports various color formats.

## Features

- Supports multiple color formats
- Bidirectional conversion
- Color operations
- Input validation
- Error handling

## Usage

To convert a color format to another format, use the following command:

```bash
node converter.js <color> --to <format>
```

Where `<color>` is the color to be converted and `<format>` is the target format.

### Examples

Convert #ff0000 to RGB:

```bash
node converter.js #ff0000 --to rgb
```

Convert rgb(255, 0, 0) to HEX:

```bash
node converter.js rgb(255, 0, 0) --to hex
```

Lighten #ff0000 by 20%:

```bash
node converter.js #ff0000 --lighten 20
```

Convert red to HSL:

```bash
node converter.js red --to hsl
```
