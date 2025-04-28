const path = require("path");
const fs = require("fs");
const { dialog } = require("electron");
const { storageDir: cacheDir } = require("../../storage.js");

/**
 * IPC handler for downloading a file from the cache to user's system.
 *
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {Object} options - Options object
 * @param {string} options.filename - The name of the file to download
 * @param {string} [options.suggestedName] - Suggested filename for the download
 * @returns {Promise<{success: boolean, filePath?: string, error?: string}>} - Result of the download
 */
const handleDownloadFile = async (event, { filename, suggestedName }) => {
  if (!filename) {
    return { success: false, error: "Filename is required" };
  }

  try {
    // Prevent directory traversal attacks
    if (filename.includes("..") || path.isAbsolute(filename)) {
      return { success: false, error: "Invalid filename" };
    }

    const sourcePath = path.join(cacheDir, filename);

    // Check if the file exists
    if (!fs.existsSync(sourcePath)) {
      return { success: false, error: `File not found: ${filename}` };
    }

    // Get suggested file name or use the original
    const defaultPath = suggestedName || filename;

    // Show save dialog
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: defaultPath,
      buttonLabel: "Save",
      properties: ["createDirectory", "showOverwriteConfirmation"]
    });

    if (canceled || !filePath) {
      return { success: false, error: "Download canceled" };
    }

    // Copy the file to the destination
    fs.copyFileSync(sourcePath, filePath);

    return { success: true, filePath };
  } catch (error) {
    console.error("Error downloading file:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { handleDownloadFile };
