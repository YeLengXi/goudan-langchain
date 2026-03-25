#define MAXCOLORS 256

#define MAXCOLORS 256

// Function to convert hex color to RGB
function hexToRgb(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "")

  // Convert 3 or 6 character hex to 6 character
  if (hex.length === 3) {
    hex = hex.split('').map(function (hex) {
      return hex + hex
    }).join('')
  }

  // Parse the hex color
  var r = parseInt(hex.substr(0, 2), 16)
  var g = parseInt(hex.substr(2, 2), 16)
  var b = parseInt(hex.substr(4, 2), 16)

  return {r: r, g: g, b: b}
}

// Function to convert RGB to hex
function rgbToHex(rgb) {
  return '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)
}

// Function to convert HSL to RGB
function hslToRgb(hsl) {
  var h = hsl.h / 360
  var s = hsl.s / 100
  var l = hsl.l / 100

  var c = (1 - Math.abs(2 * l - 1)) * s
  var x = c * (1 - Math.abs((h / 60) % 2 - 1))
  var m = l - c / 2

  var r = Math.floor((c + m) * 255)
  var g = Math.floor((x + m) * 255)
  var b = Math.floor((0 + m) * 255)

  return {r: r, g: g, b: b}
}

// Function to convert RGB to HSL
function rgbToHsl(rgb) {
  var r = rgb.r / 255
  var g = rgb.g / 255
  var b = rgb.b / 255

  var max = Math.max(r, g, b)
  var min = Math.min(r, g, b)
  var h
  var s
  var l = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0
  } else if (l < 0.5) {
    s = (max - min) / (max + min)
  } else {
    s = (max - min) / (2 - max - min)
  }

  if (max === r) {
    h = (g - b) / (max - min)
    h = h + (h < 0) ? 6 : 0
  }
  if (max === g) {
    h = (b - r) / (max - min) + 2
  }
  if (max === b) {
    h = (r - g) / (max - min) + 4
  }
  h = h / 6

  return {h: h * 360, s: s * 100, l: l * 100}
}

// Function to lighten a color
function lightenColor(color, percent) {
  var rgb = hexToRgb(color)
  var r = rgb.r
  var g = rgb.g
  var b = rgb.b

  r = r + Math.round((255 - r) * (percent / 100))
  g = g + Math.round((255 - g) * (percent / 100))
  b = b + Math.round((255 - b) * (percent / 100))

  return rgbToHex({r: r, g: g, b: b})
}

// Function to darken a color
function darkenColor(color, percent) {
  var rgb = hexToRgb(color)
  var r = rgb.r
  var g = rgb.g
  var b = rgb.b

  r = r - Math.round(r * (percent / 100))
  g = g - Math.round(g * (percent / 100))
  b = b - Math.round(b * (percent / 100))

  return rgbToHex({r: r, g: g, b: b})
}

// Function to invert a color
function invertColor(color) {
  var rgb = hexToRgb(color)
  var r = 255 - rgb.r
  var g = 255 - rgb.g
  var b = 255 - rgb.b

  return rgbToHex({r: r, g: g, b: b})
}

// Function to mix two colors
function mixColors(color1, color2, percent) {
  var rgb1 = hexToRgb(color1)
  var rgb2 = hexToRgb(color2)
  var r = Math.round(rgb1.r * (1 - percent / 100) + rgb2.r * (percent / 100))
  var g = Math.round(rgb1.g * (1 - percent / 100) + rgb2.g * (percent / 100))
  var b = Math.round(rgb1.b * (1 - percent / 100) + rgb2.b * (percent / 100))

  return rgbToHex({r: r, g: g, b: b})
}

// CLI interface
function cli() {
  var args = process.argv.slice(2)

  if (args.length === 0) {
    console.log('No arguments provided. Usage: node converter.js <color> --to <format> or --operation <operation> --percent <percent>')
    return
  }

  var color = args[0]
  var operation = args[2]
  var percent = args[3] ? parseInt(args[3]) : 0

  if (operation === '--to') {
    var format = args[1]
    if (format === 'hex') {
      console.log('Input: ' + color + '\nOutput: ' + rgbToHex(hexToRgb(color)))
    } else if (format === 'rgb') {
      console.log('Input: ' + color + '\nOutput: ' + rgbToHex(hexToRgb(color)))
    } else if (format === 'hsl') {
      console.log('Input: ' + color + '\nOutput: ' + rgbToHsl(hexToRgb(color)))
    } else if (format === 'hsv') {
      console.log('Input: ' + color + '\nOutput: ' + hsvToRgb(hexToRgb(color)))
    } else if (format === 'cmyk') {
      console.log('Input: ' + color + '\nOutput: ' + cmykToRgb(hexToRgb(color)))
    } else {
      console.log('Unknown format: ' + format)
    }
  } else if (operation === '--lighten') {
    console.log('Input: ' + color + '\nOutput: ' + lightenColor(color, percent))
  } else if (operation === '--darken') {
    console.log('Input: ' + color + '\nOutput: ' + darkenColor(color, percent))
  } else if (operation === '--invert') {
    console.log('Input: ' + color + '\nOutput: ' + invertColor(color))
  } else if (operation === '--mix') {
    var color2 = args[4]
    console.log('Input: ' + color + '\nOutput: ' + mixColors(color, color2, percent))
  } else {
    console.log('Unknown operation: ' + operation)
  }
}

// Execute CLI
cli()