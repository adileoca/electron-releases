const { notarize } = require("electron-notarize");
const { execFileSync } = require("child_process");
const path = require("path");
const pkg = require("../package.json");
const fs = require("fs");

const {
  macNotarize: { appleId, appleIdAppPassword, teamId },
  windowsSign: { credentialId, username, password },
} = require("./../vars");

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  const appName = context.packager.appInfo.productFilename;

  console.log("signingContext", {
    electronPlatformName,
    appOutDir,
    appName: context.packager.appInfo.productFilename,
  });

  if (electronPlatformName === "darwin") {
    return await notarize({
      tool: "notarytool",
      teamId: teamId,
      appBundleId: "com.adipan.app",
      appPath: `${appOutDir}/${appName}.app`,
      appleId: appleId,
      appleIdPassword: appleIdAppPassword,
    });
  }

  if (electronPlatformName === "win32") {
    // Sign the unpacked executable
    if (appOutDir.endsWith("unpacked")) {
      const unpackedExePath = path.join(appOutDir, `${appName}.exe`);
      const signedUnpackedDir = path.join(appOutDir, "signed");
      if (!fs.existsSync(signedUnpackedDir)) fs.mkdirSync(signedUnpackedDir);

      execFileSync(
        "java",
        [
          "-jar",
          path.resolve(__dirname, "CodeSignTool/jar/sign.jar"),
          "sign",
          `-credential_id=${credentialId}`,
          `-username=${username}`,
          `-password=${password}`,
          `-input_file_path=${unpackedExePath}`,
          `-output_dir_path=${signedUnpackedDir}`,
        ],
        { stdio: "inherit", cwd: path.resolve(__dirname, "CodeSignTool") }
      );

      const signedUnpackedExePath = path.join(
        signedUnpackedDir,
        `${appName}.exe`
      );
      fs.renameSync(signedUnpackedExePath, unpackedExePath);
    } else {
      // Sign the installer
      const version = pkg.version;
      const exeName = `${appName} Setup ${version}.exe`;

      const installerPath = path.join(__dirname, "../dist", exeName);
      const signedDir = path.join(path.dirname(installerPath), "signed");
      if (!fs.existsSync(signedDir)) fs.mkdirSync(signedDir);

      execFileSync(
        "java",
        [
          "-jar",
          path.resolve(__dirname, "CodeSignTool/jar/sign.jar"),
          "sign",
          `-credential_id=${credentialId}`,
          `-username=${username}`,
          `-password=${password}`,
          `-input_file_path=${installerPath}`,
          `-output_dir_path=${signedDir}`,
        ],
        { stdio: "inherit", cwd: path.resolve(__dirname, "CodeSignTool") }
      );

      // Move and rename signed installer
      const signedInstallerPath = path.join(signedDir, exeName);
      fs.renameSync(signedInstallerPath, installerPath);
    }
  }
};
