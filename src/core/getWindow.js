const { BrowserWindow } = require("electron");
const createWindow = require("./events/windowEvents");

const getWindow = () => {
  const allWindows = BrowserWindow.getAllWindows();
  let window;
  if (allWindows && allWindows.length !== 0) {
    window = allWindows[0];
  } else {
    window = createWindow();
  }
  return window;
};

module.exports = { getWindow };
