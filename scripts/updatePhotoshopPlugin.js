#!/usr/bin/env node

const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const { spawn, spawnSync } = require("child_process");
const semver = require("semver");
const os = require("os");

const DEFAULT_PLUGIN_DIR_NAME = "ps-plugin";

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const appDir = path.resolve(__dirname, "..");
  const pluginDir = resolvePluginDir(appDir, options.pluginDir);

  if (!fs.existsSync(pluginDir)) {
    throw new Error(
      `Unable to locate Photoshop plugin directory at "${pluginDir}". ` +
        "Pass --plugin-dir <path> if the projects do not share the same parent."
    );
  }

  const pluginManifestPath = path.join(pluginDir, "plugin", "manifest.json");
  const pluginPackagePath = path.join(pluginDir, "package.json");
  const pluginPackageLockPath = path.join(pluginDir, "package-lock.json");
  const pluginDistPath = path.join(pluginDir, "dist");
  const pluginDistManifestPath = path.join(pluginDistPath, "manifest.json");
  const appPackagePath = path.join(appDir, "package.json");
  const appAssetsDir = path.join(appDir, "assets", "plugin");
  const ccxDestPath = path.join(appAssetsDir, "package_PS.ccx");

  const pluginManifest = await readJson(pluginManifestPath);
  const currentVersion = pluginManifest.version;

  if (!currentVersion || !semver.valid(currentVersion)) {
    throw new Error(
      `Plugin manifest version "${currentVersion}" is missing or invalid. Add a semver value before running again.`
    );
  }

  const { nextVersion, versionChanged } = resolveNextVersion(
    currentVersion,
    options
  );
  const requestedVersionUpdate =
    options.version !== undefined || options.bump !== undefined;

  if (versionChanged) {
    console.log(
      `Updating Photoshop plugin from v${currentVersion} to v${nextVersion}`
    );
  } else if (requestedVersionUpdate) {
    console.log(
      `Photoshop plugin already at v${currentVersion}; skipping version update.`
    );
  } else {
    console.log(
      `Rebuilding Photoshop plugin at v${currentVersion} (no version bump).`
    );
  }

  if (options.dryRun) {
    console.log(
      "--dry-run enabled: no files will be modified or commands executed."
    );
  }

  if (versionChanged) {
    await updatePluginManifest(
      pluginManifestPath,
      nextVersion,
      options.dryRun
    );
    await updatePluginPackage(
      pluginPackagePath,
      pluginPackageLockPath,
      nextVersion,
      options.dryRun
    );
    await updateAppPackage(appPackagePath, nextVersion, options.dryRun);
  } else {
    console.log("Version unchanged; skipping manifest/package version updates.");
  }

  if (options.dryRun) {
    console.log("Skipping build and packaging because --dry-run is set.");
    return;
  }

  await runBuild(pluginDir);

  const distExists = fs.existsSync(pluginDistPath);
  if (!distExists) {
    throw new Error(
      `Plugin build did not produce a dist directory at "${pluginDistPath}".`
    );
  }

  await ensureDistManifestVersion(pluginDistManifestPath, nextVersion);

  await fsPromises.mkdir(appAssetsDir, { recursive: true });
  const tempArchivePath = `${ccxDestPath}.tmp`;
  await createCcxArchive(pluginDistPath, tempArchivePath);
  await fsPromises.rename(tempArchivePath, ccxDestPath);

  if (versionChanged) {
    console.log(
      `Updated ${path.relative(
        appDir,
        ccxDestPath
      )} with version ${nextVersion}.`
    );
  } else {
    console.log(
      `Rebuilt ${path.relative(
        appDir,
        ccxDestPath
      )} at version ${nextVersion}.`
    );
  }
}

function parseArgs(argv) {
  const options = {
    bump: undefined,
    version: undefined,
    pluginDir: undefined,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--bump") {
      const value = argv[++i];
      if (!value) {
        throw new Error(
          "--bump requires a value (major, minor, patch, prerelease)."
        );
      }
      options.bump = value;
      continue;
    }

    if (arg === "--version") {
      const value = argv[++i];
      if (!value) {
        throw new Error("--version requires a value (e.g. 1.2.3).");
      }
      options.version = value;
      continue;
    }

    if (arg === "--plugin-dir") {
      const value = argv[++i];
      if (!value) {
        throw new Error("--plugin-dir requires a value.");
      }
      options.pluginDir = value;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function resolvePluginDir(appDir, pluginDirArg) {
  if (pluginDirArg) {
    return path.resolve(appDir, pluginDirArg);
  }
  return path.resolve(appDir, "..", DEFAULT_PLUGIN_DIR_NAME);
}

function resolveNextVersion(currentVersion, options) {
  if (options.version) {
    if (!semver.valid(options.version)) {
      throw new Error(
        `--version requires a valid semver value. Received "${options.version}".`
      );
    }
    return {
      nextVersion: options.version,
      versionChanged: options.version !== currentVersion,
    };
  }

  if (options.bump !== undefined) {
    const allowedBumps = new Set([
      "major",
      "minor",
      "patch",
      "prerelease",
    ]);
    const bumpType = options.bump;
    if (!allowedBumps.has(bumpType)) {
      throw new Error(
        `--bump must be one of ${Array.from(allowedBumps).join(
          ", "
        )}. Received "${bumpType}".`
      );
    }

    const next = semver.inc(currentVersion, bumpType);
    if (!next) {
      throw new Error(
        `Failed to bump version ${currentVersion} using bump type "${bumpType}".`
      );
    }
    return {
      nextVersion: next,
      versionChanged: next !== currentVersion,
    };
  }

  return {
    nextVersion: currentVersion,
    versionChanged: false,
  };
}

async function readJson(filePath) {
  const raw = await fsPromises.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function writeJson(filePath, data) {
  const content = `${JSON.stringify(data, null, 2)}\n`;
  await fsPromises.writeFile(filePath, content, "utf8");
}

async function updatePluginManifest(manifestPath, version, dryRun) {
  const manifest = await readJson(manifestPath);
  manifest.version = version;

  if (dryRun) {
    console.log(`[dry-run] Would update ${manifestPath} version to ${version}`);
    return;
  }

  await writeJson(manifestPath, manifest);
}

async function updatePluginPackage(
  packagePath,
  packageLockPath,
  version,
  dryRun
) {
  const pkg = await readJson(packagePath);
  pkg.version = version;

  if (!dryRun) {
    await writeJson(packagePath, pkg);
  } else {
    console.log(`[dry-run] Would update ${packagePath} version to ${version}`);
  }

  if (fs.existsSync(packageLockPath)) {
    const lock = await readJson(packageLockPath);
    lock.version = version;
    if (lock.packages && lock.packages[""]) {
      lock.packages[""].version = version;
    }

    if (!dryRun) {
      await writeJson(packageLockPath, lock);
    } else {
      console.log(
        `[dry-run] Would update ${packageLockPath} version fields to ${version}`
      );
    }
  }
}

async function updateAppPackage(packagePath, version, dryRun) {
  const pkg = await readJson(packagePath);
  pkg.pluginVersion = version;

  if (dryRun) {
    console.log(
      `[dry-run] Would update ${packagePath} pluginVersion to ${version}`
    );
    return;
  }

  await writeJson(packagePath, pkg);
}

async function runBuild(pluginDir) {
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  console.log("Running plugin build...");
  await runCommand(npmCommand, ["run", "build"], { cwd: pluginDir });
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      ...options,
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Command ${command} ${args.join(" ")} exited with code ${code}`
          )
        );
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

async function ensureDistManifestVersion(distManifestPath, version) {
  if (!fs.existsSync(distManifestPath)) {
    throw new Error(
      `Missing dist manifest at ${distManifestPath}. The build may have failed.`
    );
  }

  const manifest = await readJson(distManifestPath);
  manifest.version = version;
  await writeJson(distManifestPath, manifest);
}

async function createCcxArchive(sourceDir, destinationFile) {
  const uxpCli = resolveUxpCli();
  if (!uxpCli) {
    throw new Error(
      "Unable to find the UXP CLI (`uxp`) in your PATH. Install @adobe/uxp-devtools-cli v1.2.0 or newer and try again."
    );
  }

  const cliMode = detectUxpCliMode(uxpCli);

  if (cliMode === "modern") {
    await packageWithModernUxpCli(uxpCli, sourceDir, destinationFile);
    return;
  }

  if (cliMode === "legacy") {
    await packageWithLegacyUxpCli(uxpCli, sourceDir, destinationFile);
    return;
  }

  throw new Error(
    "Failed to detect a compatible UXP CLI. Update @adobe/uxp-devtools-cli to the latest version."
  );
}

function resolveUxpCli() {
  const command = process.platform === "win32" ? "uxp.cmd" : "uxp";
  const result = spawnSync(command, ["--version"], { stdio: "ignore" });
  if (result.status === 0) {
    return command;
  }
  return null;
}

function detectUxpCliMode(command) {
  const helpResult = spawnSync(
    command,
    ["plugin", "package", "--help"],
    { encoding: "utf8" }
  );

  if (helpResult.status !== 0) {
    return null;
  }

  const output = helpResult.stdout || "";

  if (output.includes("--manifest") && output.includes("--outputPath")) {
    return "modern";
  }

  if (output.includes("--type") || output.includes("--overwrite")) {
    return "legacy";
  }

  return null;
}

async function packageWithModernUxpCli(
  command,
  sourceDir,
  destinationFile
) {
  const tempDirPrefix = path.join(os.tmpdir(), "uxp-package-");
  const tempDir = await fsPromises.mkdtemp(tempDirPrefix);
  try {
    console.log("Packaging Photoshop plugin with UXP CLI (modern syntax)...");

    const manifestPath = path.join(sourceDir, "manifest.json");
    const args = [
      "plugin",
      "package",
      "--manifest",
      manifestPath,
      "--outputPath",
      tempDir,
    ];

    await runCommand(
      command,
      args,
      { cwd: sourceDir }
    );

    const ccxFiles = await collectCcxFiles(tempDir);
    if (ccxFiles.length === 0) {
      throw new Error(
        `UXP CLI did not create a .ccx archive inside ${tempDir}. Check the build output above for details.`
      );
    }

    const newestFile = await pickMostRecentFile(ccxFiles);
    await fsPromises.rm(destinationFile, { force: true });
    await fsPromises.copyFile(newestFile, destinationFile);
  } finally {
    await fsPromises.rm(tempDir, { recursive: true, force: true });
  }
}

async function packageWithLegacyUxpCli(command, sourceDir, destinationFile) {
  console.log("Packaging Photoshop plugin with UXP CLI (legacy flags)...");
  await runCommand(command, [
    "plugin",
    "package",
    sourceDir,
    destinationFile,
    "--type=release",
    "--overwrite",
  ]);
}

async function collectCcxFiles(rootDir) {
  const stack = [rootDir];
  const files = [];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await fsPromises.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (
        entry.isFile() &&
        entry.name.toLowerCase().endsWith(".ccx")
      ) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function pickMostRecentFile(filePaths) {
  let candidate = filePaths[0];
  let candidateMtime = (await fsPromises.stat(candidate)).mtimeMs;

  for (let i = 1; i < filePaths.length; i += 1) {
    const filePath = filePaths[i];
    const stats = await fsPromises.stat(filePath);
    if (stats.mtimeMs > candidateMtime) {
      candidate = filePath;
      candidateMtime = stats.mtimeMs;
    }
  }

  return candidate;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
