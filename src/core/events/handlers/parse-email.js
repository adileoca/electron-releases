const { simpleParser } = require("mailparser");

/**
 * IPC handler for parsing an email.
 *
 * @param {Electron.IpcMainInvokeEvent} event - The IPC event.
 * @param {object} data - The email data to parse.
 * @returns {Promise<object>} - The parsed email.
 * @throws {Error} - If the email cannot be parsed.
 */
const handleParseEmail = async (event, { data }) => {
  try {
    const mail = await simpleParser(data); // Use an async/await pattern
    console.log("mail", mail);
    return mail; // Resolve with parsed mail
  } catch (err) {
    console.error("Error parsing the email:", err);
    throw err; // Throw errors to send to the renderer
  }
};

module.exports = { handleParseEmail };
