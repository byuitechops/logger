/* eslint no-console:0 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = (logs, title, location = '.') => {
    fs.writeFile(`${path.resolve(location)}/${title}.json`, JSON.stringify(logs, null, '\t'), err => {
        if (err) {
            console.error(err);
        } else {
            console.log(chalk.greenBright(`JSON Report written to ${path.resolve(location)}\\${title}.json`));
        }
    });
};