const fs = require("fs");
const { storageDir } = require("../../storage.js");

const getCachedFilenames = (req, res) => {
  fs.readdir(storageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Error reading directory" });
    }
    res.status(200).json({ files });
  });
};

module.exports = { getCachedFilenames };
