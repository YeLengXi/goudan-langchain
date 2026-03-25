Welcome to the Color Converter!

This tool supports various color formats and allows for bidirectional conversions. It also includes color operations such as lightening, darkening, saturation adjustment, inverting, and mixing colors.

## Usage

To convert colors, use the following format:

```
node converter.js <color> --to <format>
```

For example:

```
node converter.js #ff0000 --to rgb
```

To perform color operations, use the following format:

```
node converter.js <color> --<operation> <value>
```

For example:

```
node converter.js #ff0000 --lighten 20
```

## Supported Color Formats

- HEX (#RRGGBB)
- RGB (rgb(r, g, b))
- HSL (hsl(h, s, l))
- HSV/HSB
- CMYK
- Color names (e.g., red, blue)

## Supported Operations

- lighten
- darken
- saturate
- desaturate
- invert
- mixColors

## Contributing

Contributions are welcome! Please file an issue or submit a pull request on GitHub.

## License

MIT