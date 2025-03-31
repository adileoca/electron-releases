const CryptoJS = require("crypto-js");
const SHARED_SECRET = "b7faec26-e85d-4727-b95d-184e1309eeeb";

function encryptText(plainText) {
  // Encrypt using AES with the shared secret
  return CryptoJS.AES.encrypt(plainText, SHARED_SECRET).toString();
}

function decryptText(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SHARED_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function readMessage(message) {
  const messageStr = message.toString();
  const decryptedMessage = decryptText(messageStr);
  const parsedMessage = JSON.parse(decryptedMessage);
  return parsedMessage;
}

function encryptMessage(message) {
  const stringMessage = JSON.stringify(message);
  const encryptedMessage = encryptText(stringMessage);
  return encryptedMessage;
}

module.exports = { readMessage, encryptMessage };
