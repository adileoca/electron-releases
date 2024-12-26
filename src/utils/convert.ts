export const blobToUint8Array = (blob: Blob): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event: ProgressEvent<FileReader>) {
      // The result property contains the contents of the blob as an ArrayBuffer
      const arrayBuffer = event.target?.result as ArrayBuffer;
      // Convert ArrayBuffer to Uint8Array
      const uint8Array = new Uint8Array(arrayBuffer);
      resolve(uint8Array);
    };

    reader.onerror = function (event) {
      reject(new Error("Error reading blob"));
    };

    // Read the blob as an ArrayBuffer
    reader.readAsArrayBuffer(blob);
  });
};

