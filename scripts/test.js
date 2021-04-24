#!/usr/bin/env node

const path = require("path");
const execa = require("execa");
const colors = require("chalk");
const { existsSync } = require("fs");
const msg = require("@codedungeon/messenger");
const validFilename = require("valid-filename");

const testDirectory = "spec";
const argv = require("yargs-parser")(process.argv.slice(2));

// get arguments / parameters
let filename = argv["_"].length > 0 ? argv["_"][0] : "";
const all = argv.all;
const browser = argv.browser || all;
const dot = argv.dot || argv.ci;

if (filename.length > 0) {
  filename += !filename.includes("-rule") ? "-rule" : "";
  filename = filename.replace(".js", "") + ".js";
} else {
  filename = "*.js";
}

if (validFilename(filename)) {
  if (!existsSync(path.join(`./${testDirectory}/`, filename))) {
    msg.error(`Invalid FIlename: ./${testDirectory}/${filename}`, "ERROR");
    console.log("");
    process.exit(0);
  }
}

(async () => {
  console.log(colors.blue.bold(`==> Test Specification './${testDirectory}/${filename}'`));
  let abort = false;
  try {
    const subprocess = execa("./node_modules/mocha/bin/mocha", [`./${testDirectory}/` + filename, "--reporter", dot ? "dot" : "mocha-better-spec-reporter", "--timeout 5000"], {
      env: { FORCE_COLOR: "true" },
    });
    subprocess.stdout.pipe(process.stdout);
    const { stdout, stderr } = await subprocess;
    console.log(stderr);
    if (!stderr) {
      msg.success("All Tests Passed\n", "PASSED");
    } else {
      abort = true;
      msg.error("Testing Faileda\n", "FAIL");
    }
  } catch (error) {
    console.log("");
    abort = true;
    msg.error("Testing Failedn\n", "FAIL");
  }

  if (browser && !abort) {
    try {
      const subprocess = execa("npm", ["run", "test:browser"], {
        env: { FORCE_COLOR: "true" },
      });
      subprocess.stdout.pipe(process.stdout);
      const { stdout, stderr } = await subprocess;
      console.log(stderr);
      if (!stderr) {
        msg.success("All Tests Passed\n", "PASSED");
      } else {
        msg.error(stderr);
        abort = true;
        msg.error("Testing Faileda\n", "FAIL");
      }
    } catch (error) {
      console.log("");
      abort = true;
      msg.error("Testing Failedn\n", "FAIL");
    }
  }
})();
