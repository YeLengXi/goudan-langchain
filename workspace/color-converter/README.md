# color-converter

This tool provides a simple command-line interface for converting colors between different formats and performing color operations.

## Installation

To use this tool, you need to have Node.js installed. You can download it from [here](https://nodejs.org/).

## Usage

To convert a color, use the following format:

```bash
node converter.js <color> --to <format>
```

For example:

```bash
node converter.js #ff0000 --to rgb
```

To perform a color operation, use the following format:

```bash
node converter.js <color> --<operation> <amount>
```

For example:

```bash
node converter.js #ff0000 --lighten 20
```

## Supported Formats

- HEX (#RRGGBB)
- RGB (rgb(r, g, b))
- HSL (hsl(h, s, l))
- HSV/HSB
- CMYK
- Color names (e.g., red, blue)

## Supported Operations

- Lighten
- Darken
- Saturate
- Invert
- Mix

## Examples

Convert #ff0000 to RGB:

```bash
node converter.js #ff0000 --to rgb
```

Lighten #ff0000 by 20%:

```bash
node converter.js #ff0000 --lighten 20
```
