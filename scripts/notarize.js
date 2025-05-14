const { notarize } = require("electron-notarize");
const {
  macNotarize: { appleId, appleIdAppPassword, teamId },
} = require("./../vars");

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin") {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    tool: "notarytool",
    teamId: teamId,
    appBundleId: "com.adipan.app",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: appleId,
    appleIdPassword: appleIdAppPassword,
  });
};
