const crypto = require('crypto');

// https://www.codegrepper.com/code-examples/javascript/generate+random+token+nodejs
// https://stackoverflow.com/questions/55104802/nodejs-crypto-randombytes-to-string-hex-doubling-size
const token = crypto.randomBytes(8).toString('hex');

module.exports = token;