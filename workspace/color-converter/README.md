## Color Converter

This tool is designed to convert colors between different formats.

### Features
- Support multiple color formats: HEX, RGB, HSL, HSV/HSB, CMYK, color names
- Bidirectional conversion
- Color operations: lighten, darken, saturation adjustment, reverse, mix colors
- Input validation
- Error handling

### Usage

Convert color format:
```
node converter.js '#ff0000' --to rgb
node converter.js 'rgb(255, 0, 0)' --to hex
```

Color operations:
```
node converter.js '#ff0000' --lighten 20
node converter.js 'red' --to hsl
```
