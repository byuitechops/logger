const chalk = require('chalk');
const fws = require('fixed-width-string');

module.exports = (logObj) => {
    var color1, color2;

    function formatMessage(data) {
        var properties = [];
        Object.keys(data).forEach(key => {
            properties.push(`${chalk.gray(key + ':')} ${data[key]}`);
        });
        return properties.join(' ');
    }


    color1 = chalk.blueBright;
    color2 = chalk.whiteBright;
    if (logObj.tag == 'error') {
        color1 = chalk.red;
        color2 = chalk.redBright;
    } else if (logObj.tag == 'fatalError') {
        color1 = chalk.bgRed;
        color2 = chalk.redBright;
    } else if (logObj.tag == 'message') {
        color1 = chalk.greenBright;
    } else if (logObj.tag == 'warning') {
        color1 = chalk.yellow;
        color2 = chalk.yellowBright;
    }

    if (logObj.tag == 'error') {
        console.log(
            fws(chalk.cyan(logObj.location), 15),
            color1(fws(logObj.tag, 25, { align: 'left' })),
            color2(fws(formatMessage(logObj.data), process.stdout.columns - 42, { align: 'left' }))
        );
        return;
    }

    console.log(
        fws(chalk.cyan(logObj.location), 15),
        color1(fws(logObj.tag, 25, { align: 'left' })),
        color2(fws(formatMessage(logObj.data), process.stdout.columns - 42, { align: 'left' }))
    );
};