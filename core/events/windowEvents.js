const { BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

function createWindow() {
  let window = new BrowserWindow({
    width: 1200,
    height: 740,
    minWidth: 1200,
    minHeight: 740,
    frame: false,
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 20, y: 20 },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window.setWindowButtonVisibility(true);

  window.webContents.on("did-navigate", (event, url) => {
    if (url.includes("auth0.com")) {
      window.webContents.executeJavaScript(`
        document.body.style['-webkit-app-region'] = 'drag';
      `);
    }
  });

  window.loadURL(
    isDev
      ? "http://localhost:3001"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    window.webContents.openDevTools({ mode: "detach" });
  }
}

module.exports = createWindow;
