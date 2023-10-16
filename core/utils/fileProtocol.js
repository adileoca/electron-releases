const { protocol } = require("electron");
const path = require("path");

function registerFileProtocol() {
  protocol.registerFileProtocol(
    "electrontaskmanagement",
    (request, callback) => {
      const url = request.url.substring(6);
      const localFilePath = path.join(__dirname, url);
      callback({ path: localFilePath });
    }
  );
}

module.exports = registerFileProtocol;
