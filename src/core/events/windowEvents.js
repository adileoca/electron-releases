const { app, BrowserWindow, dialog, pushNotifications } = require("electron");
const packageJson = require("../../../package.json");
const { autoUpdater } = require("electron-updater");
const { exec } = require("child_process");
const isDev = require("electron-is-dev");
const { platform } = require("os");
const path = require("path");
const url = require("url");

function createWindow() {
  let window = new BrowserWindow({
    width: 1200,
    height: 740,
    minWidth: 1200,
    minHeight: 740,
    hasShadow: true,
    frame: false,
    vibrancy: "sidebar",
    titleBarStyle: "hidden",
    backgroundMaterial: "mica",
    darkTheme: true,
     trafficLightPosition: { x: 16, y: 16 },
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  window.isMainWindow = true;

  if (platform() === "darwin") {
    window.setWindowButtonVisibility(true);
  }

  window.loadURL(
    isDev
      ? "http://localhost:3005"
      : url.format({
          pathname: path.join(__dirname, "../../../build/index.html"),
          protocol: "file:",
          slashes: true,
        })
  );

  if (isDev) {
    window.webContents.openDevTools({ mode: "detach" });
    // dialog.showMessageBox({
    //   type: "info",
    //   title: "Update available",
    //   message:
    //     "A new version of the application is available. It will be downloaded in the background.",
    // });
  }

  window.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
    installPlugin(window);
  });

  // setInterval(() => {
  //   autoUpdater.checkForUpdatesAndNotify();
  // }, 60 * 60 * 1000); // 1 hour

  autoUpdater.on("checking-for-update", () => {
    window.webContents.send("checking-for-update");
  });

  autoUpdater.on("update-available", () => {
    window.webContents.send("update-available");
  });

  autoUpdater.on("update-downloaded", () => {
    window.webContents.send("update-downloaded");
  });

  autoUpdater.on("update-not-available", () => {
    window.webContents.send("update-not-available");
  });

  autoUpdater.on("download-progress", (event) => {
    window.webContents.send("download-progress", event);
  });

  autoUpdater.on("error", (error) => {
    window.webContents.send("update-error", event);
  });

  return window;
}

module.exports = createWindow;

const installPlugin = (window) => {
  if (isDev) {
    return;
  }

  const pluginDir = isDev
    ? "../../../assets/plugin"
    : "../../../../assets/plugin";

  const listScriptPath = path.join(
    __dirname,
    isDev ? `${pluginDir}/list.sh` : `${pluginDir}/list.sh`
  );

  const installScriptPath = path.join(
    __dirname,
    isDev ? `${pluginDir}/install.sh` : `${pluginDir}/install.sh`
  );

  const pluginPath = path.join(
    __dirname,
    isDev ? `${pluginDir}/package_PS.ccx` : `${pluginDir}/package_PS.ccx`
  );

  window.webContents.send("plugin-message", {
    message: "Checking if plugin is installed...",
  });

  exec(`bash ${listScriptPath}`, (error, stdout, stderr) => {
    if (error) {
      const message = `Error executing script: ${error.message}`;
      window.webContents.send("plugin-message", { message });
      return;
    }
    if (stderr) {
      const message = `Script stderr: ${stderr}`;
      window.webContents.send("plugin-message", { message });
      return;
    }

    const parsedOutput = parseOutput(stdout);

    const psPlugins = Object.entries(parsedOutput)
      .filter(([appName]) => appName.includes("Photoshop"))
      .flatMap(([appName, { version, extensions }]) => {
        return extensions.map(({ name, version, status }) => ({
          name,
          version,
          status,
        }));
      });

    const adipanPlugin = psPlugins.find(({ name }) => name === "adipan");

    if (
      psPlugins.length === 0 ||
      !adipanPlugin ||
      adipanPlugin.version !== packageJson.pluginVersion
    ) {
      window.webContents.send("plugin-message", {
        message:
          "Plugin not installed or version mismatch, installing plugin...",
      });
      exec(
        `bash ${installScriptPath} ${pluginPath}`,
        (error, stdout, stderr) => {
          if (error) {
            const message = `Error executing script: ${error.message}`;
            window.webContents.send("plugin-message", { message });
            return;
          }
          if (stderr) {
            const message = `Script stderr: ${stderr}`;
            window.webContents.send("plugin-message", { message });
            return;
          }

          const message = `Script output: ${stdout}`;
          window.webContents.send("plugin-message", { message });
          console.log(message);
        }
      );
    }
  });
};

function parseOutput(text) {
  const result = {};
  const blocks = text.split(/\n\s*\n/).filter(Boolean);

  blocks.forEach((block) => {
    const lines = block.split("\n").map((line) => line.trim());

    // Match "X extension installed for Y (ver Z)"
    const match = lines[0].match(
      /^(\d+)\s+extension installed for\s+(.+)\s+\(ver\s+([\d.]+)\)/i
    );
    if (match) {
      const [_, count, appName, version] = match;
      result[appName] = { version, extensions: [] };

      // Grab extension lines
      for (let i = 1; i < lines.length; i++) {
        const extMatch = lines[i].match(
          /(Enabled|Disabled)\s+(\S+)\s+([\d.]+)/
        );
        if (extMatch) {
          const [__, status, name, extVer] = extMatch;
          result[appName].extensions.push({ status, name, version: extVer });
        }
      }
    }
  });

  return result;
}
