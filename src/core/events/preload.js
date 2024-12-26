const { contextBridge, ipcRenderer } = require("electron");

const validChannels = ["data-request", "data-response"]; // List of allowed channels

contextBridge.exposeInMainWorld("electron", {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  openLink: (url) => ipcRenderer.send("open-link", url),
  setSession: (session) => ipcRenderer.send("set-session", session),
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  
  on: (channel, func) => {
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  removeListener: (channel, func) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, func);
    }
  },
});
