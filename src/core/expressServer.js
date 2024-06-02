const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const CryptoJS = require("crypto-js");
const { getToken } = require("./tokenManager"); // Import tokenManager

const app = express();
const port = 4500;

const sharedSecret = "your-secure-shared-secret"; // Shared secret

app.use(cors());
app.use(bodyParser.json());

function encryptToken(token) {
  return CryptoJS.AES.encrypt(token, sharedSecret).toString();
}

// Middleware to check the custom header
app.use((req, res, next) => {
  const secret = req.headers["x-shared-secret"];
  if (secret && secret === sharedSecret) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// Endpoint to get the encrypted token
app.get("/api/token", (_, res) => {
  console.log("Received request for /api/token");
  const token = getToken();
  if (token) {
    const encryptedToken = encryptToken(token);
    res.json({ token: encryptedToken });
  } else {
    res.status(404).json({ message: "Token not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

module.exports = app;
