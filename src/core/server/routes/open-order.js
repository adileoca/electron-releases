const { BrowserWindow } = require("electron");

/**
 * Sets up the Express server.
 *
 * @param {BrowserWindow} window - The Electron BrowserWindow instance.
 */
const handleOpenOrder = (req, res, window) => {
  try {
    console.log("opening order");
    const { order_id } = req.body;

    if (!order_id) {
      console.error("order_id is required");
      return res.status(400).json({ message: "order_id is required" });
    }

    window.show(); // Ensure the window is shown and focused
    window.focus(); // Focus the window
    console.log("focused order")
    window.webContents.send("open-order", order_id);
    console.log("sent message to renderer")
    res.status(200).json({ message: "Order opened" });
    // send ipc event to renderer with the order no to focus on
  } catch (error) {
    console.error("Error handling open order:", error);
    res.status(500).json({ message: "Error handling open order" });
  }
};

module.exports = { handleOpenOrder };
