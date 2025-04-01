const { BrowserWindow } = require("electron");
const { getWindow } = require("../../getWindow");

const openOrder = async (req, res) => {
  try {
    console.log("Opening order - Request received");
    const { order_id } = req.body;

    if (!order_id) {
      console.error("order_id is required");
      return res.status(400).json({ message: "order_id is required" });
    }

    const window = await getWindow();

    if (!window) {
      console.error("ERROR: Window reference is null");
      return res.status(500).json({ message: "Main window is not available" });
    }

    window.show();
    window.focus();
    window.webContents.send("open-order", order_id);

    console.log("IPC message completed, returning success response");
    res.status(200).json({ message: "Order opened" });
  } catch (error) {
    console.error("Error handling open order:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: error.message,
      message: "Error handling open order",
    });
  }
};

module.exports = { openOrder };
