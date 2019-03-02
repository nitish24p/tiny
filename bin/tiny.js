#! /usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const ROOT_FOLDER = process.cwd();
const BASE_ROOT = `${__dirname}/../`;
const templateFolder = `${BASE_ROOT}/templates`;

const folderName = process.argv.slice(2)[0];
const destination = `${ROOT_FOLDER}/${folderName}`;


if (!folderName) {
  console.log(chalk.blue(`
    Looks like you didnt mention a folder name
    Try typing
    tiny <folder-name>
  `))
  process.exit(1)
}

scaffoldRepo()


/**
 * Helper function to create Repo
 */
function scaffoldRepo() {
  if (doesFileExist(destination)) {
    console.log(chalk.blue(`
      The folder ${folderName} already exists
    `));
    process.exit(1);
  } else {
    fs.mkdirSync(destination, {
      recursive: true
    });

    fs.copyFileSync(`${templateFolder}/index.html`, `${destination}/index.html`)
    fs.copyFileSync(`${templateFolder}/server.js`, `${destination}/server.js`)
    fs.closeSync(fs.openSync(destination + '/main.js', 'w'));
    fs.closeSync(fs.openSync(destination + '/main.css', 'w'));

    console.log(chalk.blue(`
      ✅\t Done
      cd ${folderName} 
      Start Hacking!!!
    `))
  }
}

/**
* Helper function to check if file exists
*/
function doesFileExist (filepath) {
  return fs.existsSync(filepath)
}



