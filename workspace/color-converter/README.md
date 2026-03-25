## color-converter

This tool is a color converter that supports various color formats for conversion.

## Features

- Support multiple color formats
- Bidirectional conversion
- Color operations (lighten/darken, saturation adjustment, invert, mix colors)
- Input validation
- Error handling

## Usage

### Conversion

To convert a color format to another format, use the following command:

```bash
node converter.js <color> --to <format>
```

For example:

```bash
node converter.js #ff0000 --to rgb
node converter.js rgb(255, 0, 0) --to hex
```

### Color Operations

To perform color operations, use the following command:

```bash
node converter.js <color> --<operation> <value>
```

For example:

```bash
node converter.js #ff0000 --lighten 20
node converter.js red --to hsl
```

## CLI Interface

The CLI interface supports the following commands:

- `--to <format>`: Convert the input color to the specified format.
- `--lighten <value>`: Lighten the color by the specified percentage.
- `--darken <value>`: Darken the color by the specified percentage.
- `--saturation <value>`: Adjust the saturation of the color.
- `--invert`: Invert the color.
- `--mix <color>`: Mix the color with another color.

## Examples

```bash
$ node converter.js #ff0000 --to rgb
Input: #ff0000
Output: rgb(255, 0, 0)

$ node converter.js #ff0000 --lighten 20
Input: #ff0000
Output: #ff6666 (20% lighter)
```