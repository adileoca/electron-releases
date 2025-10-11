const path = require("path");
const fs = require("fs");

const { storageDir: cacheDir } = require("../../storage.js");
const { createLogger } = require("../../utils/logging.js");

const logger = createLogger("ipc-handler-read-file");

/**
 * IPC handler for reading a file.
 *
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {string} filename - The name of the file to read.
 * @returns {Promise<string>} - The content of the file.
 * @throws {Error} - If the filename is invalid or the file cannot be read.
 */
const handleReadFile = async (event, { filename, channel }) => {
  if (!filename) {
    throw new Error("Filename is required.");
  }

  try {
    // Prevent directory traversal attacks
    if (filename.includes("..") || path.isAbsolute(filename)) {
      throw new Error("Invalid filename.");
    }

    const filePath = path.join(cacheDir, filename);
    logger.info("start", { filename, filePath });

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      logger.warn("missing", { filename });
      throw new Error(`File not found: ${filename}`);
    }

    const readStream = fs.createReadStream(filePath, {
      encoding: "base64",
      highWaterMark: 1024 * 1024, // 1MB chunks
    });

    let index = 0;

    readStream.on("error", (error) => {
      logger.error("stream-error", error);
      event.sender.send(channel, { error: error.message });
    });

    for await (const chunk of readStream) {
      logger.debug("chunk", { index, size: chunk.length });
      event.sender.send(channel, { chunk, index });
      index++;
    }

    logger.info("complete", { chunks: index });
    event.sender.send(channel, { done: true, index });
  } catch (error) {
    logger.error("error", error);
    // Send a generic error message to the renderer
    throw new Error("Failed to read the file.", error);
  }
};

module.exports = { handleReadFile };

// module.exports = { handleReadFile };
// const handleReadFile = async (event, filename) => {
//   if (!filename) {
//     throw new Error("Filename is required.");
//   }
//   try {
//     // Prevent directory traversal attacks
//     if (filename.includes("..") || path.isAbsolute(filename)) {
//       throw new Error("Invalid filename.");
//     }

//     console.log("cacheDir", cacheDir);
//     // Resolve the absolute path within the allowed directory
//     const filePath = path.join(cacheDir, filename);

//     // Check if the file exists
//     if (!fs.existsSync(filePath)) {
//       throw new Error(`File not found: ${filename}`);
//     }

//     // Read the file content as a Buffer
//     const content = await fs.promises.readFile(filePath);
//     return content.toString("base64");
//   } catch (error) {
//     console.error("Error reading file:", error);
//     // Send a generic error message to the renderer
//     throw new Error("Failed to read the file.");
//   }
// };

// module.exports = { handleReadFile };
