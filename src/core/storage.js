const { app: electronApp } = require("electron");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storageDir = path.join(electronApp.getPath("userData"), "storage");
// Ensure the storage directory exists
fs.mkdirSync(storageDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDir);
  },
  filename: (req, file, cb) => {
    console.log("req", req.body);
    const originalFilename =
      req.body.filename || `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, originalFilename);
  },
});

const upload = multer({ storage: storage });

module.exports = { storageDir, upload };
