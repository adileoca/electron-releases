const fs = require("fs");
const path = require("path");
const log = require("electron-log");

const LOG_FILE_NAME = process.env.ELECTRON_LOG_FILE || "electron-dev.log";

function ensureLogDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function setupLogging() {
  const projectRoot = path.resolve(__dirname, "../..");
  const logDirectory = path.join(projectRoot, "logs");
  const logFile = path.join(logDirectory, LOG_FILE_NAME);

  ensureLogDirectory(logDirectory);

  // Configure electron-log to write into the repository so Codex can tail it.
  log.transports.file.resolvePathFn = () => logFile;
  log.transports.file.level = "silly";
  log.transports.file.maxSize = 5 * 1024 * 1024;
  log.transports.file.format =
    "{y}-{m}-{d} {h}:{i}:{s}.{ms} [{level}] {text}";

  log.transports.console.level = "info";
  log.transports.console.format = "{h}:{i}:{s}.{ms} [{level}] {text}";

  // Mirror console.* calls to electron-log so existing console usage is captured.
  Object.assign(console, log.functions);

  log.info("Electron logging initialised", { logFile });

  return { logFile };
}

module.exports = {
  log,
  setupLogging,
};
