const colorConverter = {
  // 输入颜色字符串，输出RGB对象
  parseHex: (hex) => {
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
      throw new Error('Invalid hex color format');
    }
    const hexColor = hex.slice(1);
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    return { r, g, b };
  },

  // 输入RGB对象，输出HEX字符串
  toHex: (rgb) => {
    const { r, g, b } = rgb;
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  },

  // 输入颜色字符串，输出HSL对象
  parseHSL: (hsl) => {
    if (!/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})\%,\s*(\d{1,3})\%\s*\)$/i.test(hsl)) {
      throw new Error('Invalid HSL color format');
    }
    const [_, h, s, l] = hsl.match(/hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})\%,\s*(\d{1,3})\%/);
    return { h, s: parseInt(s, 10) / 100, l: parseInt(l, 10) / 100 };
  },

  // 输入HSL对象，输出HEX字符串
  toHSLHex: (hsl) => {
    const { h, s, l } = hsl;
    const hslToRgb = (h, s, l) => {
      let c = (1 - Math.abs(2 * l - 1)) * s;
      let x = c * (1 - Math.abs(h / 60 % 2 - 1));
      let m = l - c / 2;
      let r, g, b;
      if (h < 60) { r = c; g = x; b = 0; } else if (h < 120) { r = x; g = c; b = 0; } else if (h < 180) { r = 0; g = c; b = x; } else if (h < 240) { r = 0; g = x; b = c; } else if (h < 300) { r = x; g = 0; b = c; } else { r = c; g = 0; b = x; }
      return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
    }
    const rgb = hslToRgb(h, s, l);
    return colorConverter.toHex(rgb);
  },

  // 输入颜色字符串，输出HSV对象
  parseHSV: (hsv) => {
    if (!/^hsv\(\s*(\d{1,3})\s*,\s*(\d{1,3})\%,\s*(\d{1,3})\%\s*\)$/i.test(hsv)) {
      throw new Error('Invalid HSV color format');
    }
    const [_, h, s, v] = hsv.match(/hsv\(\s*(\d{1,3})\s*,\s*(\d{1,3})\%,\s*(\d{1,3})\%/);
    return { h, s: parseInt(s, 10) / 100, v: parseInt(v, 10) / 100 };
  },

  // 输入HSV对象，输出HEX字符串
  toHSVHex: (hsv) => {
    const { h, s, v } = hsv;
    const hsvToRgb = (h, s, v) => {
      let i = Math.floor(h * 6);
      let f = h * 6 - i;
      let p = v * (1 - s);
      let q = v * (1 - s * f);
      let t = v * (1 - s * (1 - f));
      let r, g, b;
      if (i === 0) { r = v; g = t; b = p; } else if (i === 1) { r = q; g = v; b = p; } else if (i === 2) { r = p; g = v; b = t; } else if (i === 3) { r = p; g = q; b = v; } else if (i === 4) { r = t; g = p; b = v; } else if (i === 5) { r = v; g = p; b = q; }
      return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }
    const rgb = hsvToRgb(h, s, v);
    return colorConverter.toHex(rgb);
  },

  // 输入颜色字符串，输出CMYK对象
  parseCMYK: (cmyk) => {
    if (!/^cmyk\(\s*(\d{1,3})\%,\s*(\d{1,3})\%,\s*(\d{1,3})\%,\s*(\d{1,3})\%\s*\)$/i.test(cmyk)) {
      throw new Error('Invalid CMYK color format');
    }
    const [_, c, m, y, k] = cmyk.match(/cmyk\(\s*(\d{1,3})\%,\s*(\d{1,3})\%,\s*(\d{1,3})\%,\s*(\d{1,3})\%/);
    return { c: parseInt(c, 10) / 100, m: parseInt(m, 10) / 100, y: parseInt(y, 10) / 100, k: parseInt(k, 10) / 100 };
  },

  // 输入CMYK对象，输出HEX字符串
  toCMYKHex: (cmyk) => {
    const { c, m, y, k } = cmyk;
    const cmykToRgb = (c, m, y, k) => {
      const r = 255 * (1 - k) * (1 - c);
      const g = 255 * (1 - k) * (1 - m);
      const b = 255 * (1 - k) * (1 - y);
      return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
    }
    const rgb = cmykToRgb(c, m, y, k);
    return colorConverter.toHex(rgb);
  },

  // 输入颜色名称，输出RGB对象
  parseName: (name) => {
    const colorNames = {
      'red': { r: 255, g: 0, b: 0 },
      'green': { r: 0, g: 255, b: 0 },
      'blue': { r: 0, g: 0, b: 255 },
      // ... other color names
    }
    return colorNames[name.toLowerCase()];
  },

  // 输入RGB对象，输出HSL对象
  toHSL: (rgb) => {
    const { r, g, b } = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else { let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  },

  // 输入HSV对象，输出RGB对象
  toRGB: (hsv) => {
    const { h, s, v } = hsv;
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - s * f);
    let t = v * (1 - s * (1 - f));
    let r, g, b;
    if (i === 0) { r = v; g = t; b = p; } else if (i === 1) { r = q; g = v; b = p; } else if (i === 2) { r = p; g = v; b = t; } else if (i === 3) { r = p; g = q; b = v; } else if (i === 4) { r = t; g = p; b = v; } else if (i === 5) { r = v; g = p; b = q; }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  },

  // 输入CMYK对象，输出RGB对象
  toRGB: (cmyk) => {
    const { c, m, y, k } = cmyk;
    const cmykToRgb = (c, m, y, k) => {
      const r = 255 * (1 - k) * (1 - c);
      const g = 255 * (1 - k) * (1 - m);
      const b = 255 * (1 - k) * (1 - y);
      return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };n