const fs = require("fs");
const path = require("path");

const { storageDir: cacheDir } = require("../../storage.js");
const { createLogger } = require("../../utils/logging.js");

const logger = createLogger("ipc-handler-cache-file");

/**
 * IPC handler for caching a file.
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {{ filename: string, content: string }} body - The filename and content to cache.
 * @returns {Promise<void>}
 */
const handleCacheFile = async (_, { filename, content }) => {
  try {
    logger.info("start", { filename, size: content?.length });
    const filePath = path.join(cacheDir, filename);
    await fs.promises.writeFile(filePath, content);
    logger.info("success", { filename });
  } catch (err) {
    logger.error("error", err);
  }
};

module.exports = { handleCacheFile };
