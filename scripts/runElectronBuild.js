#!/usr/bin/env node

const fsPromises = require("fs/promises");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");
const semver = require("semver");

const APP_ROOT = path.resolve(__dirname, "..");
const RELEASE_REMOTE = "https://github.com/adileoca/electron-releases.git";
const RELEASE_BRANCH = "main";
const DIST_DIR = path.join(APP_ROOT, "dist");

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
    publishReleaseRepo: false,
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

    if (arg === "--publish-release-repo") {
      options.publishReleaseRepo = true;
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

  const builderArgs = ["electron-builder", "build", "--windows", "--mac"];
  if (!hasPublishOverride(options.builderArgs)) {
    builderArgs.push("--publish", "always");
  }
  builderArgs.push(...options.builderArgs);
  await runCommand(getNpxCommand(), builderArgs, options, "Run electron-builder (deploy)");

  if (options.publishReleaseRepo) {
    await publishReleaseArtifacts(options);
  } else {
    console.log(
      "Skipping release repo publish; pass --publish-release-repo to runElectronBuild.js if you still need the git mirror."
    );
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

function runCommand(command, args, options, label, cwd = APP_ROOT) {
  if (options.dryRun) {
    console.log(`[dry-run] ${label}: ${command} ${args.join(" ")}`);
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      cwd,
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

async function publishReleaseArtifacts(options) {
  const version = await getAppVersion();

  if (!(await pathExists(DIST_DIR))) {
    throw new Error(`Distribution folder "${DIST_DIR}" not found. Run the build before deploying.`);
  }

  if (options.dryRun) {
    console.log(
      `[dry-run] Would publish contents of ${DIST_DIR} to ${RELEASE_REMOTE} (${RELEASE_BRANCH}) as an orphan commit`
    );
    return;
  }

  const workingRoot = await fsPromises.mkdtemp(path.join(os.tmpdir(), "electron-release-"));
  const workingDir = path.join(workingRoot, "repo");

  try {
    await runCommand(
      "git",
      ["clone", "--depth", "1", RELEASE_REMOTE, workingDir],
      options,
      "Clone release repository"
    );

    const orphanBranch = `publish-${Date.now()}`;
    await runCommand(
      "git",
      ["checkout", "--orphan", orphanBranch],
      options,
      "Create orphan branch for release",
      workingDir
    );

    await clearDirectory(workingDir);
    await copyReleaseArtifacts(DIST_DIR, workingDir, version);

    await runCommand("git", ["add", "."], options, "Stage release artifacts", workingDir);

    const commitMessage = version ? `Release v${version}` : "Release artifacts";
    await runCommand(
      "git",
      ["commit", "-m", commitMessage],
      options,
      "Commit release artifacts",
      workingDir
    );

    await runCommand(
      "git",
      ["push", "--force-with-lease", "origin", `HEAD:${RELEASE_BRANCH}`],
      options,
      "Push release artifacts",
      workingDir
    );
  } finally {
    await fsPromises.rm(workingRoot, { recursive: true, force: true });
  }
}

async function getAppVersion() {
  const pkgPath = path.join(APP_ROOT, "package.json");
  const pkgRaw = await fsPromises.readFile(pkgPath, "utf8");

  try {
    const pkg = JSON.parse(pkgRaw);
    return pkg.version;
  } catch (error) {
    throw new Error(`Failed to read app version from package.json: ${error.message}`);
  }
}

async function clearDirectory(targetDir) {
  const entries = await fsPromises.readdir(targetDir);
  await Promise.all(
    entries.map(async (entry) => {
      if (entry === ".git") {
        return;
      }
      await fsPromises.rm(path.join(targetDir, entry), { recursive: true, force: true });
    })
  );
}

async function copyReleaseArtifacts(sourceDir, targetDir, version) {
  await fsPromises.mkdir(targetDir, { recursive: true });

  const entries = await fsPromises.readdir(sourceDir, { withFileTypes: true });

  const copied = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      // Skip directories (mac/, win-unpacked/, etc.) and other non-file entries to keep repo small.
      continue;
    }

    const isYaml = entry.name.endsWith(".yml") || entry.name.endsWith(".yaml");
    const shouldInclude = isYaml || entry.name.includes(version);
    if (!shouldInclude) {
      continue;
    }

    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    await fsPromises.copyFile(sourcePath, targetPath);
    copied.push(entry.name);
  }

  if (copied.length === 0) {
    throw new Error(
      `No release artifacts were copied from ${sourceDir}. Confirm the build generated files for v${version}.`
    );
  }
}

async function pathExists(targetPath) {
  try {
    await fsPromises.access(targetPath);
    return true;
  } catch (error) {
    return false;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
