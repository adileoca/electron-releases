const https = require("https");
const path = require("path");
const fs = require("fs");

const { storageDir: cacheDir } = require("../../storage.js");

/**
 * IPC handler for caching a file from a URL.
 *
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {{ url: string, filename: string }} body - The URL and filename to cache.
 * @returns {Promise<{ message: string }>}
 * @throws {Error} - If the file cannot be downloaded or written.
 */
const handleCacheFileFromUrl = async (event, { url, filename }) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          // Check the Content-Type header for file type
          const contentType = response.headers["content-type"];
          const extension = mimeToExtension(contentType); // Function to map MIME type to an extension

          const completeFilename = extension
            ? `${filename}.${extension}`
            : filename;
          const filePath = path.join(cacheDir, completeFilename);

          const file = fs.createWriteStream(filePath);
          // Pipe the response directly to the file
          response.pipe(file);
          file.on("finish", () => {
            file.close(() => {
              console.log("Caching successful");
              resolve({
                message: `File ${completeFilename} cached successfully.`,
              });
            });
          });
          file.on("error", (err) => {
            fs.unlink(filePath, () =>
              reject(new Error(`File write error: ${err.message}`))
            );
          });
        } else {
          reject(
            new Error(
              `Failed to download file. Status Code: ${response.statusCode}`
            )
          );
        }
      })
      .on("error", (err) => {
        reject(new Error(`Error fetching file from URL: ${err.message}`));
      });
  });
};

module.exports = { handleCacheFileFromUrl };

function mimeToExtension(mimeType) {
  const mimeTypes = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    // Add more MIME types and their corresponding extensions as needed
    "application/pdf": "pdf",
    "text/html": "html",
    "application/json": "json",
    // Add more as needed
  };

  return mimeTypes[mimeType] || null;
}
