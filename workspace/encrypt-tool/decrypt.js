const crypto = require('crypto');
const { caesarCipher, base64Encode, rot13, simpleXor, aesEncrypt } = require('./encrypt');

module.exports = {
  caesarCipher: function(text, key) {
    return caesarCipher(text, key);
  },
  base64Encode: function(text) {
    return base64Encode(text);
  },
  rot13: function(text) {
    return rot13(text);
  },
  simpleXor: function(text, key) {
    return simpleXor(text, key);
  },
  aesEncrypt: function(text, key) {
    return aesEncrypt(text, key);
  }
};