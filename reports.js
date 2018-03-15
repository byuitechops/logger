const chalk = require('chalk');
const fws = require('fixed-width-string');

function setHtmlHeader() {

}

function setCategoryDescription() {

}

function html() {

}

function console(logs) {
    var errors = logs.filter(log => log.title === 'error');
    var fatalErrors = logs.filter(log => log.title === 'fatalError');
    var warnings = logs.filter(log => log.title === 'warning');

    console.log('\n' + chalk.bgBlue(`${fws('', 40)}REPORT${fws('', 40)}`));
    console.log(fws('|', 86, { align: 'right' }));

    console.log(`${fws(chalk.red(fws('FATAL ERRORS:', 14) + fatalErrors.length), 46)}${fws('|', 40, { align: 'right' })}`);
    if (fatalErrors.length > 0) {
        var fatalLocations = [...new Set(errors.map(error => error.location))];
        fatalLocations.forEach(location => console.log(`${fws(' - ' + location, 46)}${fws('|', 40, { align: 'right' })}`));
    }
    console.log(fws('|', 86, { align: 'right' }));

    console.log(`${fws(chalk.redBright(fws('ERRORS:', 14) + errors.length), 46)}${fws('|', 40, { align: 'right' })}`);
    if (errors.length > 0) {
        var errorLocations = [...new Set(errors.map(error => error.location))];
        errorLocations.forEach(location => console.log(`${fws(' - ' + location, 46)}${fws('|', 40, { align: 'right' })}`));

    }
    console.log(fws('|', 86, { align: 'right' }));

    console.log(`${fws(chalk.yellow(fws('WARNINGS:', 14) + warnings.length), 46)}${fws('|', 40, { align: 'right' })}`);
    if (warnings.length > 0) {
        var warningLocations = [...new Set(errors.map(error => error.location))];
        warningLocations.forEach(location => console.log(`${fws(' - ' + location, 46)}${fws('|', 40, { align: 'right' })}`));
    }
    console.log(fws('|', 86, { align: 'right', padding: '_' }));
    return;
}

function json() {

}

module.exports = {
    html,
    console,
    json
};