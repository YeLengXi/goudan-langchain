const hexToRgb = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHex = (rgb) => {
    const [r, g, b] = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1).map(Number);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const hslToRgb = (hsl) => {
    const [h, s, l] = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/).slice(1).map(Number);
    // ... (实现转换逻辑) ...
};

const rgbToHsl = (rgb) => {
    const [r, g, b] = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1).map(Number);
    // ... (实现转换逻辑) ...
};

const lighten = (color, percent) => {
    // ... (实现变亮逻辑) ...
};

const darken = (color, percent) => {
    // ... (实现变暗逻辑) ...
};

const saturate = (color, percent) => {
    // ... (实现饱和度调整逻辑) ...
};

const desaturate = (color, percent) => {
    // ... (实现饱和度降低逻辑) ...
};

const invert = (color) => {
    // ... (实现反色逻辑) ...
};

const mixColors = (color1, color2) => {
    // ... (实现混合颜色逻辑) ...
};

module.exports = {
    hexToRgb,
    rgbToHex,
    hslToRgb,
    rgbToHsl,
    lighten,
    darken,
    saturate,
    desaturate,
    invert,
    mixColors
};