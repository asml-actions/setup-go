const core = require("@actions/core");
const exec = require("@actions/exec");

const token = "X-JFrog-Art-Api:" + process.env.ARTIFACTORY_TOKEN;
const toolsPath = process.env.RUNNER_TOOL_CACHE;

const main = async () => {
  try {
    await exec.exec("curl", [
      "-H",
      token,
      "-O",
      "https://artifactory-de.asml.com/artifactory/rise-generic-dev-local/toolchain-cache/go_tool_cache.tar.gz",
    ]);

    await exec.exec("tar", ["-zxf", "go_tool_cache.tar.gz"]);
    await exec.exec("cp", ["-r", "go", toolsPath]);
  } catch (error) {
    core.setFailed(error.message);
  }
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
        core.addPath(toolsPath+"/go/1.16.14/x64/bin");
        break;
      case "1.17":
        core.addPath(toolsPath+"/go/1.17.7/x64/bin");
        break;
      default:
        core.setFailed(
          "go-version needs to be specified !! (SUPPORTED VERSIONS:1.14.x, 1.15.x, 1.16.x, 1.17.x)"
        );
        break;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

// Call the main function to run the action
main();
