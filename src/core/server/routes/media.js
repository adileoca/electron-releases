const path = require("path");
const fs = require("fs");
const { storageDir } = require("../../storage.js");

const getMedia = (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    console.error("Filename is required");
    return res.status(400).json({ message: "Filename is required" });
  }

  // Resolve the full path of the file
  const filePath = path.join(storageDir, filename);
  // Security check to prevent directory traversal attacks
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(storageDir))) {
    console.error("Access denied");
    return res.status(403).json({ message: "Access denied" });
  }

  // Check if the file exists and is a file
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      console.error("Error reading file:", err);
      return res.status(404).json({ message: "File not found" });
    }

    // Create a read stream and pipe it to the response
    const readStream = fs.createReadStream(filePath);
    // Handle errors during streaming
    readStream.on("error", (streamErr) => {
      console.error("Error reading file:", streamErr);
      res.status(500).json({ message: "Error reading file" });
    });

    // Set appropriate headers
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${path.basename(filePath)}"`
    );

    // Pipe the read stream to the response
    readStream.pipe(res);
  });
};

module.exports = { getMedia };
