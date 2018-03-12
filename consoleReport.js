/* eslint no-console:0 */

const chalk = require('chalk');
const fws = require('fixed-width-string');

module.exports = (course, callback) => {

    var errors = course.logs.filter(log => log.title == 'error');
    var fatalErrors = course.logs.filter(log => log.title == 'fatalError');
    var warnings = course.logs.filter(log => log.title == 'warning');

    console.log(`\nNew Canvas Course: https://byui.instructure.com/courses/${course.info.canvasOU}`);
    if (course.info.prototypeOU)
        console.log(`\nCopy of Original Course: https://byui.instructure.com/courses/${course.info.prototypeOU}`);

    console.log('\n' + chalk.bgBlue(' FINAL REPORT '));

    console.log(chalk.redBright(fws('ERRORS:', 14) + errors.length));
    if (errors.length > 0) {
        var errorLocations = [...new Set(errors.map(error => error.location))];
        console.log(chalk.red('Error Locations:'));
        errorLocations.forEach(location => console.log(location));
    }

    console.log(chalk.red(fws('FATAL ERRORS:', 14) + fatalErrors.length));
    if (fatalErrors.length > 0) {
        var fatalLocations = [...new Set(errors.map(error => error.location))];
        console.log(chalk.red('Fatal Error Locations:'));
        fatalLocations.forEach(location => console.log(location));
    }

    console.log(chalk.yellow(fws('WARNINGS:', 14) + warnings.length));
    if (warnings.length > 0) {
        var warningLocations = [...new Set(errors.map(error => error.location))];
        console.log(chalk.red('Warning Locations:'));
        warningLocations.forEach(location => console.log(location));
    }

    callback(null, course);
};