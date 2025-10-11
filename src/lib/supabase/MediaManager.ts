import { Session } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { blobToUint8Array } from "../utils/convert";
import Database from "./database";
import { logDebug, logWarn } from "@/lib/logging";
import { getCachedFilenames } from "@/lib/utils/ipc";

const DEFAULT_SIGNED_URL_TTL = 7 * 24 * 60 * 60; // 7 days
const SIGNED_URL_REFRESH_BUFFER_MS = 60 * 1000; // refresh 1 minute before expiry
const MISSING_CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours

export type MediaUrlResult = {
  url: string;
  isObjectUrl: boolean;
};

class MediaManager {
  private db: Database;
  private session: Session;
  private urlCache: Map<string, { url: string; expiresAt?: number }> =
    new Map();
  private missingCache: Map<string, number> = new Map();
  private cachedFilenames: Set<string> | null = null;
  private cacheIndexPromise?: Promise<void>;

  constructor(db: Database, session: Session) {
    this.db = db;
    this.session = session;
  }

  async get(
    media: { id: string; bucket_name: string; path: string },
    options?: { as?: "blob" | "uint8Array" }
  ) {
    await this.ensureCacheIndex();
    const cacheKey = media.id ?? `${media.bucket_name}:${media.path}`;
    const missingExpiresAt = this.missingCache.get(cacheKey);
    const isKnownMissing = !!missingExpiresAt && missingExpiresAt > Date.now();
    const isIndexed = this.cachedFilenames?.has(cacheKey) ?? false;

    let cacheResult: CacheFetchResult;
    if (!isKnownMissing && isIndexed) {
      cacheResult = await getCachedFile(media.id!);
    } else {
      cacheResult = { data: null, reason: "not-found" };
      logDebug("media-skip-local-cache", { cacheKey });
    }

    const cachedFile = cacheResult.data;

    if (cachedFile) {
      // console.log("Found in cache, returning cached file", media);
      if (options?.as === "blob") {
        return new Blob([cachedFile]);
      }
      return cachedFile;
    } else {
      if (cacheResult.reason === "not-found") {
        this.missingCache.set(cacheKey, Date.now() + MISSING_CACHE_TTL);
        logDebug("media-cache-miss-blob", {
          id: media.id,
          bucket: media.bucket_name,
        });
      } else if (cacheResult.reason === "error") {
        logWarn("media-cache-error-blob", {
          id: media.id,
          bucket: media.bucket_name,
        });
      }
      const file = await this.db.get.media.file({
        bucketName: media?.bucket_name!,
        path: media?.path!,
      });

      if (!file) {
        console.error("File not found in db", media);
        return null;
      }

      if (options?.as === "blob") {
        this.missingCache.delete(cacheKey);
        return file;
      }

      this.missingCache.delete(cacheKey);
      return file ? blobToUint8Array(file) : null;
    }
  }

  async getUrl(
    media: { id: string; bucket_name: string; path: string },
    options?: { expiresIn?: number }
  ): Promise<MediaUrlResult | null> {
    await this.ensureCacheIndex();
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

    const missingExpiresAt = this.missingCache.get(cacheKey);
    const isKnownMissing = !!missingExpiresAt && missingExpiresAt > Date.now();
    const isIndexed = this.cachedFilenames?.has(cacheKey) ?? false;

    let cachedFile: Uint8Array | null = null;
    let cacheMissReason: "known-missing" | "not-found" | "error" | null = null;

    if (!isKnownMissing && isIndexed) {
      const cacheResult = await getCachedFile(media.id!);
      cachedFile = cacheResult.data;
      if (!cachedFile) {
        if (cacheResult.reason === "not-found") {
          this.missingCache.set(cacheKey, Date.now() + MISSING_CACHE_TTL);
          cacheMissReason = "not-found";
        } else if (cacheResult.reason === "error") {
          cacheMissReason = "error";
        }
      }
    } else {
      cacheMissReason = "known-missing";
    }

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
    this.missingCache.delete(cacheKey);

    if (cacheMissReason && cacheMissReason !== "known-missing") {
      logDebug("media-cache-miss", {
        cacheKey,
        reason: cacheMissReason,
      });
    }

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

  private async ensureCacheIndex() {
    if (this.cachedFilenames) return;
    if (this.cacheIndexPromise) {
      await this.cacheIndexPromise;
      return;
    }

    this.cacheIndexPromise = getCachedFilenames()
      .then((filenames) => {
        this.cachedFilenames = new Set(filenames);
        logDebug("media-cache-index-loaded", {
          count: filenames.length,
        });
      })
      .catch((error) => {
        logWarn("media-cache-index-error", { error: String(error) });
        this.cachedFilenames = new Set();
      })
      .finally(() => {
        this.cacheIndexPromise = undefined;
      });

    await this.cacheIndexPromise;
  }
}

export default MediaManager;

type CacheFetchResult = {
  data: Uint8Array | null;
  reason?: "not-found" | "error";
};

export const getCachedFile = async (
  filename: string
): Promise<CacheFetchResult> => {
  try {
    logDebug("media-cache-request", { filename });
    const response = await axios.post(
      "http://localhost:4500/media",
      { filename },
      { responseType: "arraybuffer" }
    );
    // Convert the ArrayBuffer to Uint8Array
    const uint8Array = new Uint8Array(response.data);
    // Return the Uint8Array for further processing
    return { data: uint8Array };
  } catch (error: any) {
    // Check if the error is an Axios error with a response
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        logDebug("media-cache-not-found", { filename });
        return { data: null, reason: "not-found" };
      }
      logWarn("media-cache-error", {
        filename,
        status: error.response.status,
      });
      return { data: null, reason: "error" };
    }
    // For other errors, you can handle them accordingly
    // console.error("Error getCachedFile:", error);
    // throw error;
    logWarn("media-cache-unknown-error", { filename });
    return { data: null, reason: "error" };
  }
};

export type UploadConfig = {
  path: string;
  bucket_name: string;
  group_id?: string;
  id?: string;
};
