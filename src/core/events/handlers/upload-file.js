const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const tus = require("tus-js-client");
const path = require("path");
const fs = require("fs");

const { storageDir: cacheDir } = require("../../storage.js");
const { createLogger } = require("../../utils/logging.js");

const projectId = "vrdaoudvtphptybaljqq";
const logger = createLogger("ipc-handler-upload-file");

async function handleUploadFile(event, { filename, accessToken, bucketPath }) {
  if (!filename) {
    throw new Error("Filename is required.");
  }
  try {
    if (filename.includes("..") || path.isAbsolute(filename)) {
      throw new Error("Invalid filename.");
    }

    const filePath = path.join(cacheDir, filename);
    logger.info("start", { filename, bucketPath });
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filename}`);
    }

    const readStream = fs.createReadStream(filePath);

    const sanitizedBucketPath = bucketPath.startsWith("/")
      ? bucketPath.slice(1)
      : bucketPath;

    const uploadPromise = new Promise(async (resolve, reject) => {
      let lastProgressBucket = -1;
      var upload = new tus.Upload(readStream, {
        endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          authorization: `Bearer ${accessToken}`,
          "x-upsert": "true", // optionally set upsert to true to overwrite existing files
        },
        uploadDataDuringCreation: true,
        removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
        metadata: {
          bucketName: "private_bucket",
          objectName: sanitizedBucketPath,
          // contentType: "image/png",
          // cacheControl: 3600,
        },
        chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
        onError: function (error) {
          logger.error("error", error);
          reject(error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          if (!bytesTotal) return;
          const percentage = Math.min(
            100,
            Math.floor((bytesUploaded / bytesTotal) * 100)
          );
          const progressBucket = Math.floor(percentage / 5);
          if (progressBucket !== lastProgressBucket) {
            lastProgressBucket = progressBucket;
            logger.debug("progress", {
              bytesUploaded,
              bytesTotal,
              percentage,
            });
          }
        },
        onSuccess: function () {
          logger.info("success", {
            objectName: sanitizedBucketPath,
            url: upload.url,
          });
          resolve();
        },
      });

      // Check if there are any previous uploads to continue.
      return upload.findPreviousUploads().then(function (previousUploads) {
        // Found previous uploads so we select the first one.
        if (previousUploads.length) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload.start();
      });
    });

    await uploadPromise;

    return { error: null };
  } catch (error) {
    logger.error("exception", error);
    return { error };
  }
}

module.exports = { handleUploadFile };
