const reports = require('./reports.js');
const moment = require('moment');

module.exports = class Logger {

    constructor() {
        this.logs = [];
        this.htmlReport = reports.html;
        this.consoleReport = reports.console;
        this.jsonReport = reports.json;
    }

    log(title, obj) {
        var logObj;
        if (obj == undefined || typeof title != 'string') {
            console.log(this.getCallingModule(), 'Incorrect inputs into logger.log: ', title);
            return;
        }
        logObj = {
            title: title,
            location: this.getCallingModule(),
            timestamp: moment().format(),
            data: obj
        };
        this.logs.push(logObj);
        this.console(logObj);
    }

    error() {

    }

    fatalError() {

    }

    warning() {

    }

    message() {

    }

    console() {

    }
};