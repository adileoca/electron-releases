const { execFileSync } = require("child_process");
const path = require("path");
const pkg = require("../package.json");

const version = pkg.version;
const exeName = `adipan Setup ${version}.exe`;
const file = path.join(__dirname, "../dist", exeName);

const { credentialId, username, password } = require("./../vars");

execFileSync(
  "java",
  [
    "-jar",
    "./eSigner.jar",
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
