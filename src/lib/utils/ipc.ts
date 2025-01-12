import { v4 as uuidv4 } from "uuid";

export async function readFile(filename: string): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const worker = new Worker(
      "http://localhost:3001/workers/decodeBase64Worker.js"
    );

    const channel = uuidv4();
    const chunks: { [key: number]: Uint8Array } = {};
    let expectedChunks = 0;
    let receivedChunks = 0;
    let doneIndex = -1;

    worker.onmessage = function (event) {
      const { decodedChunk, error, index } = event.data;
      if (error) {
        reject(new Error(error));
        worker.terminate();
      } else {
        chunks[index] = decodedChunk;
        receivedChunks++;
        checkCompletion();
      }
    };

    function checkCompletion() {
      if (doneIndex !== -1 && receivedChunks === doneIndex) {
        console.log("All chunks received, terminating worker.");
        const binaryChunks = Object.keys(chunks)
          .sort((a, b) => Number(a) - Number(b))
          .map((key) => chunks[Number(key)]);
        const blob = new Blob(binaryChunks);
        console.log("blob created from binary chunks");
        console.log("blob size:", blob.size);
        resolve(blob);
        worker.terminate();
      }
    }

    window.electron.on(channel, (message) => {
      if (!message) {
        console.error("Received undefined message");
        return;
      }

      if (message.done) {
        doneIndex = message.index;
        checkCompletion();
      } else {
        console.log("received chunk from main process:", message.chunk);
        expectedChunks++;
        worker.postMessage({ chunk: message.chunk, index: message.index });
      }
    });

    window.electron
      .invoke("read-file", { filename, channel })
      .then(() => {
        console.log("file read request sent to main process");
      })
      .catch((error) => {
        reject(new Error("Failed to read file: " + error.message));
        worker.terminate();
      });
  });
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
