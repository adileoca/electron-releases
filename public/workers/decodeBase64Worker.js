self.onmessage = function (event) {
  const { chunk, index } = event.data;

  console.log("Worker received message:", event.data);

  try {
    const decodedChunk = Uint8Array.from(atob(chunk), (c) => c.charCodeAt(0));
    self.postMessage({ decodedChunk, index });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
