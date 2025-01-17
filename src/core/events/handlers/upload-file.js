const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const { ipcRenderer } = require("electron");
const tus = require("tus-js-client");
const path = require("path");
const fs = require("fs");

const { storageDir: cacheDir } = require("../../storage.js");

// const uploadFile = async (event, { filename, accessToken, bucketPath }) => {
//   if (!filename) {
//     throw new Error("Filename is required.");
//   }
//   try {
//     // Prevent directory traversal attacks
//     if (filename.includes("..") || path.isAbsolute(filename)) {
//       throw new Error("Invalid filename.");
//     }

//     const filePath = path.join(cacheDir, filename);
//     // Check if the file exists
//     if (!fs.existsSync(filePath)) {
//       throw new Error(`File not found: ${filename}`);
//     }

//     const s3Client = new S3Client({
//       forcePathStyle: true,

//       endpoint: "https://vrdaoudvtphptybaljqq.supabase.co/storage/v1/s3",
//       credentials: {
//         accessKeyId: "vrdaoudvtphptybaljqq",
//         secretAccessKey: ANON_KEY,

//         accessToken,
//       },
//     });

//     const readStream = fs.createReadStream(filePath);

//     const sanitizedBucketPath = bucketPath.startsWith("/")
//       ? bucketPath.slice(1)
//       : bucketPath;
//     console.log("bucketPath", sanitizedBucketPath);

//     const uploadCommand = new PutObjectCommand({
//       Bucket: "private_bucket",
//       Body: readStream,
//       Key: sanitizedBucketPath,
//     });

//     await s3Client.send(uploadCommand);

//     return { error: null };
//   } catch (error) {
//     console.error("Error uploading file:", error.message);
//     return { error };
//   }
// };

const projectId = "vrdaoudvtphptybaljqq";

async function handleUploadFile(event, { filename, accessToken, bucketPath }) {
  if (!filename) {
    throw new Error("Filename is required.");
  }
  try {
    if (filename.includes("..") || path.isAbsolute(filename)) {
      throw new Error("Invalid filename.");
    }

    const filePath = path.join(cacheDir, filename);
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filename}`);
    }

    const readStream = fs.createReadStream(filePath);

    const sanitizedBucketPath = bucketPath.startsWith("/")
      ? bucketPath.slice(1)
      : bucketPath;

    const uploadPromise = new Promise(async (resolve, reject) => {
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
          console.log("Failed because: " + error);
          reject(error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(bytesUploaded, bytesTotal, percentage + "%");
        },
        onSuccess: function () {
          console.log("Download %s from %s", upload.file.name, upload.url);
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
    console.error("Error uploading file:", error.message);
    return { error };
  }
}
module.exports = { handleUploadFile };
