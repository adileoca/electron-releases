const { dialog } = require("electron");
const { exec } = require("child_process");
const isDev = require("electron-is-dev");
const path = require("path");
const packageJson = require("../../../package.json");

const installPlugin = ({ force, window }) => {
  // if (isDev) return;

  const isWindows = process.platform === "win32";
  const scriptExt = isWindows ? "bat" : "sh";

  const pluginDir = isDev
    ? "../../../assets/plugin"
    : "../../../../assets/plugin";

  const listScriptPath = path.join(__dirname, `${pluginDir}/list.${scriptExt}`);
  const installScriptPath = path.join(
    __dirname,
    `${pluginDir}/install.${scriptExt}`
  );
  const pluginPath = path.join(
    __dirname,
    isDev ? `${pluginDir}/package_PS.ccx` : `${pluginDir}/package_PS.ccx`
  );

  // Helper to run the install script
  function runInstallScript() {
    window.webContents.send("plugin-message", {
      message: "Installing plugin...",
    });

    const execCmd = isWindows
      ? `${installScriptPath} ${pluginPath}`
      : `bash "${installScriptPath}" "${pluginPath}"`;

    exec(execCmd, (error, stdout, stderr) => {
      if (error) {
        const message = `Error executing script: ${error.message}\nSTDERR: ${stderr}\nSTDOUT: ${stdout}`;
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
    });
  }

  if (force) {
    runInstallScript();
    return;
  }

  window.webContents.send("plugin-message", {
    message: "Checking if plugin is installed...",
  });

  const execCmd = isWindows ? listScriptPath : `bash "${listScriptPath}"`;

  exec(execCmd, (error, stdout, stderr) => {
    if (error) {
      const message = `Error executing script: ${error.message}\nSTDERR: ${stderr}\nSTDOUT: ${stdout}`;
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
      runInstallScript();
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

module.exports = { installPlugin };
