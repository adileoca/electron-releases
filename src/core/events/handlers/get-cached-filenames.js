const fs = require("fs");
const { storageDir: cacheDir } = require("../../storage.js");
/**
 * IPC handler for reading a file.
 *
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @returns {Promise<string[]>} - The list of filenames in the cache directory.
 * @throws {Error} - If the file list cannot be fetched.
 */
const handleGetCachedFilenames = async (event) => {
  try {
    console.log("cacheDir", cacheDir);
    return fs.readdirSync(cacheDir);
  } catch (err) {
    console.error("Error fetching cached files:", err);
    throw err; // Throw errors to send to the renderer
  }
};

module.exports = { handleGetCachedFilenames };
