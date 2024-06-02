const axios = require("axios");
const fs = require("fs");

async function downloadImage(url, filename) {
  try {
    console.log("Downloading from URL:", url);
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const writableStream = fs.createWriteStream(filename);

    response.data.pipe(writableStream);

    return new Promise((resolve, reject) => {
      writableStream.on("finish", resolve);
      writableStream.on("error", reject);
    });
  } catch (error) {
    console.error("Failed to download image:", error);
    throw error;
  }
}


module.exports = downloadImage;
