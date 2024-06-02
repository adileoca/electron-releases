// tokenManager.js
let authToken = "";

function setToken(token) {
  authToken = token;
  console.log("Token received and stored in tokenManager");
}

function getToken() {
  return authToken;
}

module.exports = { setToken, getToken };
