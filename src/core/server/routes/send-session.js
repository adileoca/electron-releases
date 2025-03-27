const { BrowserWindow } = require("electron");

/**
 * Sets up the Express server.
 *
 * @param {BrowserWindow} window - The Electron BrowserWindow instance.
 */
const handleUpdateSession = (session, window) => {
  try {
    console.log("opening order");
    const { order_id } = req.body;

    if (!order_id) {
      console.error("order_id is required");
      return res.status(400).json({ message: "order_id is required" });
    }

    // window.show(); // Ensure the window is shown and focused
    // window.focus(); // Focus the window
    // console.log("focused order");
    window.webContents.send("session-update", session);
  } catch (error) {
    console.error("Error sending session update to renderer:", error);
    res.status(500).json({ message: "Error handling open order" });
  }
};

module.exports = { handleUpdateSession };
