const CryptoJS = require("crypto-js");

function decByAes(data) {
  var bytes = CryptoJS.AES.decrypt(data, "xiaoantech911");
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

function encByAes(data) {
  var ciphertext = crypto.AES.encrypt(
    JSON.stringify(data),
    "xiaoantech911"
  ).toString();
  return ciphertext;
}
module.exports = { decByAes, encByAes };
