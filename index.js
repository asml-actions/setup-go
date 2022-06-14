const core = require("@actions/core");
const exec = require("@actions/exec");
<<<<<<< HEAD
const fs = require("fs");

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

const token = "Authorization: Bearer " + process.env.ARTIFACTORY_TOKEN;
const toolsPath = process.env.RUNNER_TOOL_CACHE;
const artifactoryURL =
  "https://artifactory-de.asml.com/artifactory/rise-generic-dev-local/toolchain-cache/go_tool_cache.tar.gz";
const version = core.getInput('go-version');


if (!process.env.ARTIFACTORY_TOKEN) {
  core.setFailed(
    `Environment variable 'ARTIFACTORY_TOKEN' not found, please provide a token that can download from ${artifactoryURL}`
  );
}

const main = async () => {
  try {
    await exec.exec("curl", ["-f", "-s", "-H", token, "-O", artifactoryURL]);
=======

const token = "Authorization: Bearer " + process.env.ARTIFACTORY_TOKEN;
const toolsPath = process.env.RUNNER_TOOL_CACHE;

const main = async () => {
  try {
    await exec.exec("curl", [
      "-f",
      "-H",
      token,
      "-O",
      "https://artifactory-de.asml.com/artifactory/rise-generic-dev-local/toolchain-cache/go_tool_cache.tar.gz",
    ]);

>>>>>>> 50afeb71386027d635b32a331604a6110df1b5d0
    await exec.exec("tar", ["-zxf", "go_tool_cache.tar.gz"]);
    await exec.exec("cp", ["-r", "go", toolsPath]);
  } catch (error) {
    core.setFailed(error.message);
  }
<<<<<<< HEAD

  const directories = getDirectories(toolsPath + "/go/");
  let toolsDirVersion;
  console.log(
    `Found [${directories.length}] directories in [${toolsPath}/go/]:`
  );
  for (var index = 0; index < directories.length; ++index) {
    console.log(
      `- ${directories[index]} with [${directories[index].slice(0, 4)}]`
    );

    if (directories[index].slice(0, 4) == version) {
      console.log(
        `Found the directory version we need: [${directories[index]}]`
      );
      toolsDirVersion = directories[index];
    }
  }

  // set the path to the correct version
  if (toolsDirVersion) {
    console.log(`Setting the core path`);
    core.addPath(toolsPath + `/go/${toolsDirVersion}/x64/bin`);
    return;
  } else {
    core.setFailed(
      "go-version needs to be specified !! (SUPPORTED VERSIONS:1.14.x, 1.15.x, 1.16.x, 1.17.x"
    );
    return 1;
=======
  try {
    let version = core.getInput("go-version");
    await exec.exec("echo", [version]);

    switch (version.slice(0, 4)) {
      case "1.14":
        core.addPath(toolsPath+"/go/1.14.15/x64/bin");
        break;
      case "1.15":
        core.addPath(toolsPath+"/go/1.15.15/x64/bin");
        break;
      case "1.16":
        core.addPath(toolsPath+"/go/1.16.15/x64/bin");
        break;
      case "1.17":
        core.addPath(toolsPath+"/go/1.17.9/x64/bin");
        break;
      default:
        core.setFailed(
          "go-version needs to be specified !! (SUPPORTED VERSIONS:1.14.x, 1.15.x, 1.16.x, 1.17.x)"
        );
        break;
    }
  } catch (error) {
    core.setFailed(error.message);
>>>>>>> 50afeb71386027d635b32a331604a6110df1b5d0
  }
};

// Call the main function to run the action
main();
