# Color Converter

This tool allows you to convert between different color formats and perform various color operations.

## Usage

To convert a color format to another:

```
node converter.js <color> --to <format>
```

Where <color> is the color you want to convert and <format> is the format you want to convert to (e.g., hex, rgb, hsl, hsv, cmyk).

To perform a color operation:

```
node converter.js <color> --operation <operation> --percent <percent>
```

Where <color> is the color you want to operate on, <operation> is the operation you want to perform (e.g., lighten, darken, invert, mix), and <percent> is the percentage by which to perform the operation.

## Examples

Convert #ff0000 to RGB:

```
node converter.js #ff0000 --to rgb
```

Lighten #ff0000 by 20%:

```
node converter.js #ff0000 --lighten 20
```

Invert #ff0000:

```
node converter.js #ff0000 --invert
```
