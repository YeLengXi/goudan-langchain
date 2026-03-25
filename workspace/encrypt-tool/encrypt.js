module.exports = {
  caesarCipher: function(text, key) {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        let charCode = char.charCodeAt(0);
        charCode = charCode >= 65 && charCode <= 90 ? charCode + key : charCode + key - 32;
        charCode = charCode > 90 ? charCode - 26 : charCode;
        charCode = charCode < 65 ? charCode + 26 : charCode;
        return String.fromCharCode(charCode);
      }
      return char;
    }).join('');
  },
  base64Encode: function(text) {
    return Buffer.from(text).toString('base64');
  },
  rot13: function(text) {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        let charCode = char.charCodeAt(0);
        charCode = charCode >= 97 && charCode <= 122 ? charCode + 13 : charCode - 13;
        charCode = charCode > 122 ? charCode - 26 : charCode;
        charCode = charCode < 97 ? charCode + 26 : charCode;
        return String.fromCharCode(charCode);
      }
      return char;
    }).join('');
  },
  simpleXor: function(text, key) {
    return text.split('').map((char, index) => {
      let charCode = char.charCodeAt(0);
      let keyChar = key.charCodeAt(index % key.length);
      return String.fromCharCode(charCode ^ keyChar);
    }).join('');
  },
  aesEncrypt: function(text, key) {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
};