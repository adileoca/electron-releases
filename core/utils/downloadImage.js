const axios = require("axios");
const fs = require("fs");

async function downloadImage(url, filename) {
  console.log("url", url);
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
}

module.exports = downloadImage;
