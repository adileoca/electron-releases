const { exec } = require("child_process");
const path = require("path");

function runExtendScript(imagePath, backgroundPath = null) {
  const scriptPath = path.resolve(__dirname, "../scripts/script.jsx");
  const command =
    `osascript -e 'tell application "Adobe Photoshop 2024" to activate' ` +
    `-e 'tell application "Adobe Photoshop 2024" to do javascript file "${scriptPath}" ` +
    `with arguments {"${imagePath}", "${backgroundPath}"}'`;

  // const scriptPath2 = path.resolve(__dirname, "../scripts/script2.jsx");
  // const command2 = `osascript -e 'tell application "Adobe Photoshop 2024" to activate' -e 'tell application "Adobe Photoshop 2024" to do javascript file "${scriptPath2}"'`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing script:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing script:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

module.exports = runExtendScript;
