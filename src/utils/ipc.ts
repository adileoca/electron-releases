// Function overloads to define return types based on format
export function readFile(
  filename: string,
  format: "binary"
): Promise<Uint8Array>;
export function readFile(filename: string, format: "blob"): Promise<Blob>;

// Implementation of the function
export async function readFile(
  filename: string,
  format: "blob" | "binary"
): Promise<Uint8Array | Blob> {
  // Fetch the file content as a base64 encoded string
  const base64Content = await window.electron.invoke("read-file", filename);

  // Convert the base64 string to a binary Uint8Array
  const binaryContent = Uint8Array.from(atob(base64Content), (c) =>
    c.charCodeAt(0)
  );

  // Return the content based on the specified format
  if (format === "binary") {
    // If 'binary' is specified, return the binary Uint8Array
    return binaryContent;
  } else if (format === "blob") {
    // If 'blob' is specified, convert the binary content to a Blob and return it
    return new Blob([binaryContent]);
  }

  // The return type is guaranteed by the overloads, but you could still add error handling here if needed
  throw new Error(`Unsupported format: ${format}`);
}
export const getCachedFilenames = async (): Promise<string[]> => {
  return await window.electron.invoke("get-cached-filenames");
};

export const removeFromCache = async (filename: string) => {
  return await window.electron.invoke("delete-cache-file", { filename });
};

type cacheFileProps = { filename: string; content: Uint8Array };

export const cacheFile = async ({ filename, content }: cacheFileProps) => {
  return window.electron.invoke("cache-file", {
    content: content,
    filename: filename,
  });
};
