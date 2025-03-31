const { storageDir: cacheDir } = require("../../storage.js");
const path = require("path");
const fs = require("fs");

/**
 * IPC handler for reading a file.
 *
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {{ filename: string }} body - The name of the file to read.
 * @returns {Promise<void>}
 */
const handleDeleteCachedFile = async (_, { filename }) => {
  try {
    const filePath = path.join(cacheDir, filename);
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file
      await fs.promises.unlink(filePath);
      console.log(`File ${filename} deleted from cache.`);
    } else {
      console.warn(`File ${filename} does not exist in the cache.`);
    }
  } catch (err) {
    console.error("Error deleting file:", err);
  }
};

module.exports = { handleDeleteCachedFile };
