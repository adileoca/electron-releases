#!/usr/bin/env node

const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const { spawn } = require("child_process");
const archiver = require("archiver");
const semver = require("semver");

const DEFAULT_PLUGIN_DIR_NAME = "photoshop plugin";
const DEFAULT_BUMP = "patch";

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

  const nextVersion = resolveNextVersion(currentVersion, options);

  console.log(`Updating Photoshop plugin from v${currentVersion} to v${nextVersion}`);

  if (options.dryRun) {
    console.log("--dry-run enabled: no files will be modified or commands executed.");
  }

  await updatePluginManifest(pluginManifestPath, nextVersion, options.dryRun);
  await updatePluginPackage(pluginPackagePath, pluginPackageLockPath, nextVersion, options.dryRun);
  await updateAppPackage(appPackagePath, nextVersion, options.dryRun);

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

  console.log(`Updated ${path.relative(appDir, ccxDestPath)} with version ${nextVersion}.`);
}

function parseArgs(argv) {
  const options = {
    bump: DEFAULT_BUMP,
    version: undefined,
    pluginDir: undefined,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--bump") {
      const value = argv[++i];
      if (!value) {
        throw new Error("--bump requires a value (major, minor, patch, prerelease).");
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
      throw new Error(`--version requires a valid semver value. Received "${options.version}".`);
    }
    return options.version;
  }

  const allowedBumps = new Set(["major", "minor", "patch", "prerelease"]);
  const bumpType = options.bump || DEFAULT_BUMP;
  if (!allowedBumps.has(bumpType)) {
    throw new Error(`--bump must be one of ${Array.from(allowedBumps).join(", ")}. Received "${bumpType}".`);
  }

  const next = semver.inc(currentVersion, bumpType);
  if (!next) {
    throw new Error(`Failed to bump version ${currentVersion} using bump type "${bumpType}".`);
  }
  return next;
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

async function updatePluginPackage(packagePath, packageLockPath, version, dryRun) {
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
      console.log(`[dry-run] Would update ${packageLockPath} version fields to ${version}`);
    }
  }
}

async function updateAppPackage(packagePath, version, dryRun) {
  const pkg = await readJson(packagePath);
  pkg.pluginVersion = version;

  if (dryRun) {
    console.log(`[dry-run] Would update ${packagePath} pluginVersion to ${version}`);
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
        reject(new Error(`Command ${command} ${args.join(" ")} exited with code ${code}`));
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

async function ensureDistManifestVersion(distManifestPath, version) {
  if (!fs.existsSync(distManifestPath)) {
    throw new Error(`Missing dist manifest at ${distManifestPath}. The build may have failed.`);
  }

  const manifest = await readJson(distManifestPath);
  manifest.version = version;
  await writeJson(distManifestPath, manifest);
}

async function createCcxArchive(sourceDir, destinationFile) {
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(destinationFile);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", resolve);
    output.on("error", reject);
    archive.on("error", reject);

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

