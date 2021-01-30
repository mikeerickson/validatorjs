// NOTE:
// This code is not pretty, just does the job as a quck and dirty tasks to find out
// what attributes are missing from each language, using hte`en.js` as master

let fs = require("fs");
let chalk = require("chalk");

let master = require("../src/lang/en.js");

let verbose = false;
let lang = process.argv[2] || ""; // pass lang list as comma separated

fs.readdir("./src/lang", (err, files) => {
  if (err) {
    console.log(chalk.red(err));
    return;
  }

  let languages = lang.length > 0 ? lang.split(",") : files;
  let masterKeys = Object.keys(master);
  let numIssues = 0;

  console.log("");
  languages.forEach((language) => {
    language = language.replace(".js", "").replace(" ", "");
    if (language !== "en") {
      let filename = `${language}.js`;
      console.log(chalk.yellow(`checking ${filename} ...`));

      let obj = require(`../src/lang/${filename}`);
      let objKeys = Object.keys(obj);
      let missingKeys = [];
      masterKeys.forEach((key) => {
        !objKeys.includes(key) ? missingKeys.push(key) : "";
      });

      numIssues += missingKeys.length;
      if (missingKeys.length > 0) {
        console.log(chalk.cyan(` ==> missing ${missingKeys.length} keys`));
        if (missingKeys.includes("def")) {
          console.log(chalk.red("     missing `def`"));
        }
        if (missingKeys.includes("attributes")) {
          console.log(chalk.red("     missing `attributes`"));
        }
        if (verbose) {
          missingKeys.forEach((missingKey) => {
            console.log("     " + missingKey);
          });
        }

        console.log("");
      }
    }
  });

  console.log(chalk.green(`===================================`));
  console.log(chalk.green(`  Total Files Processed:       ${languages.length}`));
  console.log(chalk.green(`  Total Keys:                  ${masterKeys.length}`));
  console.log(chalk.green(`  Total Issues:               ${numIssues}`));
  console.log(chalk.green(`===================================`));
  console.log("");
});
