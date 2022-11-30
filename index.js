const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

const toolsPath = process.env.RUNNER_TOOL_CACHE;
const artifactURL = "nginx-setup-tools.github-action-tools/go_tool_cache.tar.gz";
const artifactoryURL = "https://artifactory-de.asml.com/artifactory/rise-generic-dev-local/toolchain-cache/go_tool_cache.tar.gz";  
const version = core.getInput("go-version");

const main = async () => {
  try {
    if (process.env.ARTIFACTORY_DE_TOKEN_TOOLCHAIN) {
      await exec.exec("curl", ["-f", "-s", "-H", token, "-O", artifactoryURL]);
    } else {
      await exec.exec("curl", ["-f", "-s", "-O", artifactURL]);
    }
    await exec.exec("curl", ["-f", "-s", "-O", artifactURL]);
    await exec.exec("tar", ["-zxf", "go_tool_cache.tar.gz"]);

    // Clean up target location first to prevent issues on vm runners
    await exec.exec("rm", ["-rf", toolsPath + "/go/"]);
    await exec.exec("cp", ["-r", "go", toolsPath]);

    // and cleanup
    await exec.exec("rm ", ["-rf", "go"]);
    await exec.exec("rm ", ["go_tool_cache.tar.gz"]);
  } catch (error) {
    core.setFailed(error.message);
  }

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
      "go-version needs to be specified !! (SUPPORTED VERSIONS:1.14.x, 1.15.x, 1.16.x, 1.17.x, 1.18.x"
    );
    return 1;
  }
};

// Call the main function to run the action
main();
