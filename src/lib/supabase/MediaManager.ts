import { Session } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { blobToUint8Array } from "../utils/convert";
import Database from "./database";

const DEFAULT_SIGNED_URL_TTL = 7 * 24 * 60 * 60; // 7 days
const SIGNED_URL_REFRESH_BUFFER_MS = 60 * 1000; // refresh 1 minute before expiry

export type MediaUrlResult = {
  url: string;
  isObjectUrl: boolean;
};

class MediaManager {
  private db: Database;
  private session: Session;
  private urlCache: Map<string, { url: string; expiresAt?: number }> =
    new Map();

  constructor(db: Database, session: Session) {
    this.db = db;
    this.session = session;
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

  async getUrl(
    media: { id: string; bucket_name: string; path: string },
    options?: { expiresIn?: number }
  ): Promise<MediaUrlResult | null> {
    const cacheKey = media.id ?? `${media.bucket_name}:${media.path}`;
    const cachedEntry = this.urlCache.get(cacheKey);

    if (cachedEntry) {
      if (!cachedEntry.expiresAt || cachedEntry.expiresAt > Date.now()) {
        return {
          url: cachedEntry.url,
          isObjectUrl: false,
        };
      }

      this.urlCache.delete(cacheKey);
    }

    const cachedFile = await getCachedFile(media.id!);

    if (cachedFile) {
      const blob = new Blob([cachedFile]);
      return {
        url: URL.createObjectURL(blob),
        isObjectUrl: true,
      };
    }

    const signedUrl = await this.db.get.media.signedUrl({
      bucketName: media.bucket_name!,
      path: media.path!,
      expiresIn: options?.expiresIn ?? DEFAULT_SIGNED_URL_TTL,
    });

    if (!signedUrl) {
      return null;
    }

    const result = {
      url: signedUrl,
      isObjectUrl: false,
    };

    const ttlSeconds = options?.expiresIn ?? DEFAULT_SIGNED_URL_TTL;
    const expiresAt =
      Date.now() + ttlSeconds * 1000 - SIGNED_URL_REFRESH_BUFFER_MS;
    this.setUrlCache(cacheKey, result, expiresAt);
    return result;
  }

  async upload(file: any, config: UploadConfig): Promise<string> {
    try {
      const filename = config.id ? config.id : uuidv4();

      const buffer = await file.read();
      const blob = new Blob([buffer], { type: "application/octet-stream" });

      const formData = new FormData();
      formData.append("filename", filename);
      formData.append("file", blob, filename);

      const serverUrl = "http://localhost:4500/upload";
      const response = await axios.post(serverUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      console.log("response", response);

      const id = await this.db.insert.media(
        {
          id: filename,
          user_id: this.session.user.id,
          ...config,
        },
        { content: "schedule" }
      );

      return id;
    } catch (error: any) {
      // Handle errors
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  private setUrlCache(key: string, result: MediaUrlResult, expiresAt: number) {
    if (result.isObjectUrl) {
      return;
    }

    this.urlCache.set(key, {
      url: result.url,
      expiresAt: Math.max(expiresAt, Date.now()),
    });
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
      console.log(` couldn't find file with name "${filename}" in cache`);
      return null;
    }
    // For other errors, you can handle them accordingly
    // console.error("Error getCachedFile:", error);
    // throw error;
    return null;
  }
};

export type UploadConfig = {
  path: string;
  bucket_name: string;
  group_id?: string;
  id?: string;
};
