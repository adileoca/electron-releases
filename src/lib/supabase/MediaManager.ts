import axios from "axios";

import Database from "./database";

import { blobToUint8Array } from "../utils/convert";

class MediaManager {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async get(
    media: { id: string; bucket_name: string; path: string },
    options?: { as?: "blob" | "uint8Array" }
  ) {
    const cachedFile = await getCachedFile(media.id!);

    if (cachedFile) {
      // console.log("Found in cache, returning cached file", media);
      if (options?.as === "blob") {
        return new Blob([cachedFile]);
      }
      return cachedFile;
    } else {
      console.log("could't find in cache, Getting media using db", media);
      const file = await this.db.get.media.file({
        bucketName: media?.bucket_name!,
        path: media?.path!,
      });

      if (!file) {
        console.error("File not found in db", media);
        return null;
      }

      if (options?.as === "blob") {
        console.log("returning blob");
        return file;
      }

      return file ? blobToUint8Array(file) : null;
    }
  }
}

export default MediaManager;

export const getCachedFile = async (
  filename: string
): Promise<Uint8Array | null> => {
  try {
    console.log("making request...");
    const response = await axios.post(
      "http://localhost:4500/media",
      { filename },
      { responseType: "arraybuffer" }
    );
    // Convert the ArrayBuffer to Uint8Array
    const uint8Array = new Uint8Array(response.data);
    // Return the Uint8Array for further processing
    return uint8Array;
  } catch (error: any) {
    // Check if the error is an Axios error with a response
    if (axios.isAxiosError(error) && error.response) {
      console.log(`caca couldn't find file with name "${filename}" in cache`);
      return null;
    }
    // For other errors, you can handle them accordingly
    console.error("Error getCachedFile:", error);
    throw error;
  }
};
