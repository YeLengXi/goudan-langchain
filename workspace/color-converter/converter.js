const hexToRgb = (hex) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHex = (rgb) => {
  const [r, g, b] = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1).map(Number);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const lighten = (hex, percent) => {
  const r = parseInt(hex.substr(1, 2), 16) + parseInt(percent * 255 / 100);
  const g = parseInt(hex.substr(3, 2), 16) + parseInt(percent * 255 / 100);
  const b = parseInt(hex.substr(5, 2), 16) + parseInt(percent * 255 / 100);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const convert = (input, to) => {
  if (to === 'hex') {
    return rgbToHex(input);
  } else if (to === 'rgb') {
    return hexToRgb(input);
  } else if (to === 'lighten') {
    return lighten(input, parseInt(process.argv[3]));
  }
};

const main = () => {
  const input = process.argv[2];
  const to = process.argv[4] || 'hex';
  console.log(`Input: ${input}`);
  console.log(`Output: ${convert(input, to)}`);
};

main();