const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

const rgbToHex = (rgb) => {
    const [r, g, b] = rgb.match(/rgb\((\d+),\s*(\d+),\d+\)/).slice(1);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const hslToRgb = (hsl) => {
    const [h, s, l] = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/).slice(1);
    const h = h / 360;
    const s = s / 100;
    const l = l / 100;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = q - p * Math.cos(h * 2 * Math.PI);
    const g = p - q * Math.cos((h + 1/3) * 2 * Math.PI);
    const b = p - q * Math.cos((h + 2/3) * 2 * Math.PI);
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

const rgbToHsl = (rgb) => {
    const [r, g, b] = rgb.match(/rgb\((\d+),\s*(\d+),\d+\)/).slice(1);
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else if (max === r) {
        h = (g - b) / (max - min);
        h = h + (h < 0) ? 360 : h;
    } else if (max === g) {
        h = 2 + (b - r) / (max - min);
    } else if (max === b) {
        h = 4 + (r - g) / (max - min);
    }
    h = h * 60;
    s = l > 0.5 ? (max - l) / (2 - max - l) : (max - l) / (max + l);
    s = s * 100;
    return `hsl(${Math.round(h)}, ${Math.round(s)}, ${Math.round(l * 100)})`;
}

const lighten = (color, amount) => {
    const [r, g, b] = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1);
    const r1 = Math.round(r + r * amount / 100);
    const g1 = Math.round(g + g * amount / 100);
    const b1 = Math.round(b + b * amount / 100);
    return `#${r1.toString(16).padStart(2, '0')}${g1.toString(16).padStart(2, '0')}${b1.toString(16).padStart(2, '0')}`;
}

const darken = (color, amount) => {
    const [r, g, b] = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1);
    const r1 = Math.round(r - r * amount / 100);
    const g1 = Math.round(g - g * amount / 100);
    const b1 = Math.round(b - b * amount / 100);
    return `#${r1.toString(16).padStart(2, '0')}${g1.toString(16).padStart(2, '0')}${b1.toString(16).padStart(2, '0')}`;
}

const saturate = (color, amount) => {
    const [r, g, b] = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1);
    const r1 = Math.round(r + (r - min(r, g, b)) * amount / 100);
    const g1 = Math.round(g + (g - min(r, g, b)) * amount / 100);
    const b1 = Math.round(b + (b - min(r, g, b)) * amount / 100);
    return `#${r1.toString(16).padStart(2, '0')}${g1.toString(16).padStart(2, '0')}${b1.toString(16).padStart(2, '0')}`;
}

const desaturate = (color, amount) => {
    const [r, g, b] = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1);
    const r1 = Math.round(r - (r - min(r, g, b)) * amount / 100);
    const g1 = Math.round(g - (g - min(r, g, b)) * amount / 100);
    const b1 = Math.round(b - (b - min(r, g, b)) * amount / 100);
    return `#${r1.toString(16).padStart(2, '0')}${g1.toString(16).padStart(2, '0')}${b1.toString(16).padStart(2, '0')}`;
}

const invert = (color) => {
    const [r, g, b] = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1);
    return `#${(255 - r).toString(16).padStart(2, '0')}${(255 - g).toString(16).padStart(2, '0')}${(255 - b).toString(16).padStart(2, '0')}`;
}

const mix = (color1, color2, amount) => {
    const [r1, g1, b1] = color1.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1);
    const [r2, g2, b2] = color2.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1);
    const r = Math.round(r1 * (1 - amount) + r2 * amount);
    const g = Math.round(g1 * (1 - amount) + g2 * amount);
    const b = Math.round(b1 * (1 - amount) + b2 * amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const convertColor = (color, to) => {
    if (to === 'hex') {
        return hexToRgb(color);
    } else if (to === 'rgb') {
        return rgbToHex(color);
    } else if (to === 'hsl') {
        return rgbToHsl(color);
    } else if (to === 'hsv') {
        return rgbToHsv(color);
    } else if (to === 'cmyk') {
        return rgbToCmyk(color);
    } else {
        return `Unsupported format: ${to}`;
    }
}

const colorOperations = (color, operation, amount) => {
    if (operation === 'lighten') {
        return lighten(color, amount);
    } else if (operation === 'darken') {
        return darken(color, amount);
    } else if (operation === 'saturate') {
        return saturate(color, amount);
    } else if (operation === 'desaturate') {
        return desaturate(color, amount);
    } else if (operation === 'invert') {
        return invert(color);
    } else if (operation === 'mix') {
        return mix(color, amount);
    } else {
        return `Unsupported operation: ${operation}`;
    }
}

module.exports = { convertColor, colorOperations };