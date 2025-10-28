const { notarize } = require("electron-notarize");
const { execFileSync, spawnSync } = require("child_process");
const path = require("path");
const pkg = require("../package.json");
const fs = require("fs");

const {
  macNotarize: { appleId, appleIdAppPassword, teamId },
  windowsSign: { credentialId, username, password },
} = require("./../vars");

const MINIMUM_JAVA_VERSION = 11;

const parseJavaVersion = (raw) => {
  if (!raw) return null;
  const match = raw.match(/version "(?:1\.)?(\d+)/);
  if (!match) return null;
  return Number.parseInt(match[1], 10);
};

const probeJavaBinary = (binaryPath) => {
  if (!binaryPath) return null;
  const normalized = binaryPath.trim();
  if (!normalized) return null;

  const result = spawnSync(normalized, ["-version"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.error || result.status !== 0) return null;

  const version = parseJavaVersion(
    `${result.stdout || ""}${result.stderr || ""}`
  );

  if (!version || Number.isNaN(version)) return null;

  return { binary: normalized, version };
};

const resolveJavaHome = (version) => {
  const result = spawnSync("/usr/libexec/java_home", ["-v", version], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.error || result.status !== 0) return null;

  return result.stdout ? result.stdout.trim() : null;
};

const resolveJavaBinary = () => {
  const candidates = [];
  const seen = new Set();

  if (process.env.JAVA_BINARY) candidates.push(process.env.JAVA_BINARY);

  if (process.env.JAVA_HOME)
    candidates.push(path.join(process.env.JAVA_HOME, "bin", "java"));

  const javaHome17 = resolveJavaHome("17");
  const javaHome11 = resolveJavaHome("11");

  if (javaHome17)
    candidates.push(path.join(javaHome17, "bin", "java"));
  if (javaHome11)
    candidates.push(path.join(javaHome11, "bin", "java"));

  candidates.push("/opt/homebrew/opt/openjdk@21/bin/java");
  candidates.push("/opt/homebrew/opt/openjdk@17/bin/java");
  candidates.push("/opt/homebrew/opt/openjdk@11/bin/java");

  candidates.push("java");

  for (const candidate of candidates) {
    if (!candidate || seen.has(candidate)) continue;
    seen.add(candidate);
    const probe = probeJavaBinary(candidate);
    if (probe && probe.version >= MINIMUM_JAVA_VERSION) {
      if (probe.binary !== "java") {
        console.log("resolvedJavaBinary", {
          candidate: probe.binary,
          version: probe.version,
        });
      }
      return probe.binary;
    }
  }

  throw new Error(
    `Unable to find a Java runtime >= ${MINIMUM_JAVA_VERSION}. ` +
      `Install an OpenJDK 11+ distribution and set JAVA_HOME or JAVA_BINARY.`
  );
};

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  const appName = context.packager.appInfo.productFilename;

  console.log("signingContext", {
    electronPlatformName,
    appOutDir,
    appName: context.packager.appInfo.productFilename,
  });

  // if (electronPlatformName === "darwin") {
  //   return await notarize({
  //     tool: "notarytool",
  //     teamId: teamId,
  //     appBundleId: "com.adipan.app",
  //     appPath: `${appOutDir}/${appName}.app`,
  //     appleId: appleId,
  //     appleIdPassword: appleIdAppPassword,
  //   });
  // }

  if (electronPlatformName === "win32") {
    const javaBinary = resolveJavaBinary();

    // Sign the unpacked executable
    if (appOutDir.endsWith("unpacked")) {
      const unpackedExePath = path.join(appOutDir, `${appName}.exe`);
      const signedUnpackedDir = path.join(appOutDir, "signed");
      if (!fs.existsSync(signedUnpackedDir)) fs.mkdirSync(signedUnpackedDir);

      execFileSync(
        javaBinary,
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
        javaBinary,
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
