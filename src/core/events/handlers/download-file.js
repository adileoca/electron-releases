const path = require("path");
const fs = require("fs");
const { dialog } = require("electron");
const { storageDir: cacheDir } = require("../../storage.js");
const { createLogger } = require("../../utils/logging.js");

const logger = createLogger("ipc-handler-download-file");

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
    logger.info("start", { filename, suggestedName });

    // Check if the file exists
    if (!fs.existsSync(sourcePath)) {
      logger.warn("missing", { filename });
      return { success: false, error: `File not found: ${filename}` };
    }

    // Get suggested file name or use the original
    const defaultPath = suggestedName || filename;

    // Show save dialog
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: defaultPath,
      buttonLabel: "Save",
      properties: ["createDirectory", "showOverwriteConfirmation"],
    });

    if (canceled || !filePath) {
      logger.info("cancelled", { filename });
      return { success: false, error: "Download canceled" };
    }

    // Copy the file to the destination
    fs.copyFileSync(sourcePath, filePath);

    logger.info("success", { filename, destination: filePath });
    return { success: true, filePath };
  } catch (error) {
    logger.error("error", error);
    return { success: false, error: error.message };
  }
};

module.exports = { handleDownloadFile };
