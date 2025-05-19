const { notarize } = require("electron-notarize");
const { execFileSync } = require("child_process");
const path = require("path");
const pkg = require("../package.json");

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
    const version = pkg.version;
    const exeName = `${appName} Setup ${version}.exe`;
    const file = path.join(__dirname, "../dist", exeName);
    execFileSync(
      "java",
      [
        "-jar",
        path.resolve(__dirname, "eSigner.jar"),
        "sign",
        `-credential_id=${credentialId}`,
        `-username=${username}`,
        `-password=${password}`,
        `-input_file_path=${file}`,
        `-output_dir_path=${path.dirname(file)}`,
        "-timestamp_url=http://timestamp.digicert.com",
      ],
      { stdio: "inherit" }
    );
  }
};
