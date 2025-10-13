#!/usr/bin/env node

const fsPromises = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");
const semver = require("semver");

const APP_ROOT = path.resolve(__dirname, "..");
const ORIGINAL_REMOTE = "https://github.com/adileoca/ceramica-interface.git";
const RELEASE_REMOTE = "https://github.com/adileoca/electron-releases.git";

async function main() {
  const [mode, ...rest] = process.argv.slice(2);
  if (!mode || !["build", "deploy"].includes(mode)) {
    console.error('Usage: node scripts/runElectronBuild.js <build|deploy> [--update-plugin] [options]');
    process.exitCode = 1;
    return;
  }

  const options = parseOptions(rest);

  await maybeUpdateAppVersion(options);

  if (options.updatePlugin) {
    const pluginArgs = [...options.pluginArgs];
    if (options.dryRun && !pluginArgs.includes("--dry-run")) {
      pluginArgs.push("--dry-run");
    }
    await runCommand(
      process.execPath,
      [path.join(__dirname, "updatePhotoshopPlugin.js"), ...pluginArgs],
      options,
      "Run Photoshop plugin update"
    );
  }

  if (mode === "build") {
    await runBuild(options);
  } else {
    await runDeploy(options);
  }
}

function parseOptions(args) {
  const options = {
    updatePlugin: false,
    pluginArgs: [],
    builderArgs: [],
    dryRun: false,
    appBump: undefined,
    appVersion: undefined,
    appDryRun: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === "--") {
      options.builderArgs.push(...args.slice(i + 1));
      break;
    }

    if (arg === "--update-plugin") {
      options.updatePlugin = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--app-dry-run") {
      options.appDryRun = true;
      continue;
    }

    if (arg === "--app-bump") {
      const value = args[++i];
      if (!value) {
        throw new Error("--app-bump requires a value (major, minor, patch, prerelease).");
      }
      options.appBump = value;
      continue;
    }

    if (arg === "--app-version") {
      const value = args[++i];
      if (!value) {
        throw new Error("--app-version requires a value (e.g. 1.2.3).");
      }
      options.appVersion = value;
      continue;
    }

    if (arg.startsWith("--plugin-")) {
      const [key, inlineValue] = arg.split("=");
      const value = inlineValue ?? args[i + 1];

      switch (key) {
        case "--plugin-bump": {
          if (!value) {
            throw new Error("--plugin-bump requires a value.");
          }
          if (!inlineValue) i += 1;
          options.pluginArgs.push("--bump", value);
          break;
        }
        case "--plugin-version": {
          if (!value) {
            throw new Error("--plugin-version requires a value.");
          }
          if (!inlineValue) i += 1;
          options.pluginArgs.push("--version", value);
          break;
        }
        case "--plugin-dir": {
          if (!value) {
            throw new Error("--plugin-dir requires a value.");
          }
          if (!inlineValue) i += 1;
          options.pluginArgs.push("--plugin-dir", value);
          break;
        }
        case "--plugin-dry-run": {
          options.pluginArgs.push("--dry-run");
          break;
        }
        default: {
          throw new Error(`Unknown plugin option: ${key}`);
        }
      }
      continue;
    }

    options.builderArgs.push(arg);
  }

  return options;
}

async function runBuild(options) {
  await runCommand(getNpxCommand(), ["craco", "build"], options, "Run craco build");

  const builderArgs = ["electron-builder", "build", "--mac", "--windows"];
  if (!hasPublishOverride(options.builderArgs)) {
    builderArgs.push("--publish", "never");
  }
  builderArgs.push(...options.builderArgs);
  await runCommand(getNpxCommand(), builderArgs, options, "Run electron-builder (build)");
}

async function runDeploy(options) {
  await runCommand(getNpxCommand(), ["craco", "build"], options, "Run craco build");

  let remoteUpdated = false;
  try {
    await runCommand("git", ["remote", "set-url", "origin", RELEASE_REMOTE], options, "Point origin to release repository");
    remoteUpdated = true;

    const builderArgs = ["electron-builder", "build", "--windows", "--mac"];
    if (!hasPublishOverride(options.builderArgs)) {
      builderArgs.push("--publish", "always");
    }
    builderArgs.push(...options.builderArgs);
    await runCommand(getNpxCommand(), builderArgs, options, "Run electron-builder (deploy)");
  } finally {
    if (remoteUpdated) {
      await runCommand(
        "git",
        ["remote", "set-url", "origin", ORIGINAL_REMOTE],
        options,
        "Restore origin remote"
      );
    }
  }
}

function getNpxCommand() {
  return process.platform === "win32" ? "npx.cmd" : "npx";
}

function hasPublishOverride(builderArgs) {
  return builderArgs.some((arg) => arg === "--publish" || arg.startsWith("--publish="));
}

async function maybeUpdateAppVersion(options) {
  if (!options.appVersion && !options.appBump) {
    return;
  }

  const pkgPath = path.join(APP_ROOT, "package.json");
  const pkgRaw = await fsPromises.readFile(pkgPath, "utf8");
  const pkg = JSON.parse(pkgRaw);

  const currentVersion = pkg.version;
  if (!currentVersion || !semver.valid(currentVersion)) {
    throw new Error(
      `Current app version "${currentVersion}" in package.json is missing or invalid.`
    );
  }

  let nextVersion;
  if (options.appVersion) {
    if (!semver.valid(options.appVersion)) {
      throw new Error(`--app-version must be a valid semver string. Received "${options.appVersion}".`);
    }
    nextVersion = options.appVersion;
  } else {
    const allowedBumps = new Set(["major", "minor", "patch", "prerelease"]);
    if (!allowedBumps.has(options.appBump)) {
      throw new Error(
        `--app-bump must be one of ${Array.from(allowedBumps).join(", ")}. Received "${options.appBump}".`
      );
    }
    nextVersion = semver.inc(currentVersion, options.appBump);
    if (!nextVersion) {
      throw new Error(`Failed to bump app version "${currentVersion}" using ${options.appBump}.`);
    }
  }

  if (nextVersion === currentVersion) {
    console.log(`App version already at ${nextVersion}; skipping update.`);
    return;
  }

  console.log(`Updating app version from v${currentVersion} to v${nextVersion}`);

  if (options.dryRun || options.appDryRun) {
    console.log(`[dry-run] Would set package.json version to ${nextVersion}`);
    return;
  }

  pkg.version = nextVersion;
  const updated = `${JSON.stringify(pkg, null, 2)}\n`;
  await fsPromises.writeFile(pkgPath, updated, "utf8");
}

function runCommand(command, args, options, label) {
  if (options.dryRun) {
    console.log(`[dry-run] ${label}: ${command} ${args.join(" ")}`);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      cwd: APP_ROOT,
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${label} failed with exit code ${code}`));
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
