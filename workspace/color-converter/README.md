## Color Converter

This tool provides functionality to convert colors between different formats and perform various color operations.

### Usage

To use the converter, run the following command:

    node converter.js <color> --<operation>

where <color> is the color to be converted or operated on and <operation> is the operation to be performed.

#### Examples

Convert #ff0000 to RGB:
    node converter.js #ff0000 --to rgb

Convert rgb(255, 0, 0) to HEX:
    node converter.js rgb(255, 0, 0) --to hex

Lighten #ff0000 by 20%:
    node converter.js #ff0000 --lighten 20

Convert red to HSL:
    node converter.js red --to hsl
