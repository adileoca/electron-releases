const uploadHandler = (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
};

module.exports = { uploadHandler };
