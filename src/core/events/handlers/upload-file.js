const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { ipcRenderer } = require("electron");
const path = require("path");
const fs = require("fs");

const { storageDir: cacheDir } = require("../../storage.js");

const ACCESS_KEY_ID = "vrdaoudvtphptybaljqq";
const SECRET_ACCESS_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZGFvdWR2dHBocHR5YmFsanFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyNjcxNTEsImV4cCI6MjA0MDg0MzE1MX0.8lxO8TS_CRbWZKafWfKWwRKTOJ15RyaXjmmUIUl0ZJ0`;

const handleUploadFile = async (
  event,
  { filename, accessToken, bucketPath }
) => {
  if (!filename) {
    throw new Error("Filename is required.");
  }
  try {
    // Prevent directory traversal attacks
    if (filename.includes("..") || path.isAbsolute(filename)) {
      throw new Error("Invalid filename.");
    }

    const filePath = path.join(cacheDir, filename);
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filename}`);
    }

    const s3Client = new S3Client({
      forcePathStyle: true,
      region: "eu-west-1",
      endpoint: "https://vrdaoudvtphptybaljqq.supabase.co/storage/v1/s3",
      credentials: {
        accessKeyId: "fe37040e6b1a9a3e1aebb23766b25a57",
        secretAccessKey:
          "dc032880ed97ad2625f37d42feb7dff6e81a0efdcc8d178072c386c2a497b88e", // this is the public anon key
        // accessToken,
      },
    });

    const readStream = fs.createReadStream(filePath);

    const sanitizedBucketPath = bucketPath.startsWith("/")
      ? bucketPath.slice(1)
      : bucketPath;
    console.log("bucketPath", sanitizedBucketPath);
    
    const uploadCommand = new PutObjectCommand({
      Bucket: "private_bucket",
      Body: readStream,
      Key: sanitizedBucketPath,
    });

    await s3Client.send(uploadCommand);

    return { error: null };
  } catch (error) {
    console.error("Error uploading file:", error.message);
    return { error };
  }
};

module.exports = { handleUploadFile };
