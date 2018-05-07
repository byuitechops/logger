const htmlReport = require('./reporting/htmlReport.js');
const jsonReport = require('./reporting/jsonReport.js');
const consoleReport = require('./reporting/consoleReport.js');
const getCallingModule = require('./logging/getCallingModule.js');
const consoleMe = require('./logging/console.js');
const moment = require('moment');

const nonSkippables = [
    'message',
    'warning',
    'error',
    'fatalError'
];

var disableOutput = false;
var removeNewLines = false;

module.exports = class Logger {

    constructor(title = 'Report') {
        this.logs = [];
        this.reportTitle = title;
        this.reportSets = [];
        this.htmlHeader = '';
        this.logHeader = '<div class="header1">Logs</div>';
        this.tagDescriptions = [];
    }

    disableOutput(bool) {
        disableOutput = bool;
    }

    removeNewLines(bool) {
        removeNewLines = bool;
    }

    // Adds a new report set
    createReportSet(title, tags) {
        this.reportSets.push({
            title,
            tags
        });
    }

    setTagDescription(tag, description) {
        this.tagDescriptions.push({
            tag,
            description
        });
    }

    setHtmlHeader(html) {
        this.htmlHeader = html;
    }

    log(tag, details) {
        var logObj;
        var options = {
            removeNewLines
        };

        if (details == undefined || typeof tag != 'string') {
            console.log(getCallingModule(), 'Incorrect input into Logger.log(): ', tag);
            return;
        }

        logObj = {
            tag: tag,
            location: getCallingModule(),
            timestamp: moment().format(),
            data: details
        };
        if (tag !== 'message') {
            this.logs.push(logObj);
        }
        if (disableOutput !== false && !nonSkippables.includes(tag)) {
            return;
        }
        if (removeNewLines === true) {
            // Object.keys(logObj.data.details).forEach(key => {
            //     if (typeof logObj.data.details[key] === 'string') {
            //         logObj.data.details[key] = logObj.data.details[key].replace(/\n/g, ' ');
            //     }
            // });
        }
        consoleMe(logObj, options);
    }

    warning(message) {
        this.log('warning', {
            message: message
        });
    }

    error(err) {
        if (typeof err === 'string') {
            err = new Error(err);
        }
        this.log('error', {
            message: err.message,
            stack: err.stack
        });
    }

    fatalError(err) {
        if (typeof err === 'string') {
            err = new Error(err);
        }
        this.log('fatalError', {
            message: err.message,
            stack: err.stack
        });
    }

    message(message) {
        this.log('message', {
            message: message
        });
    }

    findReportSetTags(reportSetName) {
        if (typeof reportSetName === 'string') {
            var reportSet = this.reportSets.find(rs => rs.title === reportSetName);
            if (!reportSet) {
                console.error(new Error('Report Set not identified:' + reportSetName));
                return [];
            } else {
                return reportSet.tags;
            }
        } else if (Array.isArray(reportSetName)) {
            return reportSetName;
        }
    }

    buildReportTitle(reportSetName) {
        if (typeof reportSetName === 'string') {
            return `${this.reportTitle} (${reportSetName})`;
        } else {
            return this.reportTitle;
        }
    }

    filterLogs(logs, filterArray) {
        if (filterArray && filterArray.length > 0) {
            return logs.filter(log => filterArray.includes(log.tag));
        } else {
            return logs;
        }
    }

    consoleReport(reportSetName) {
        var tags = this.findReportSetTags(reportSetName);
        var logs = this.filterLogs(this.logs, tags);
        consoleReport(logs);
    }

    jsonReport(path, reportSetName) {
        var tags = this.findReportSetTags(reportSetName);
        var title = this.buildReportTitle(reportSetName);
        var logs = this.filterLogs(this.logs, tags);
        jsonReport(logs, title, path);
    }

    htmlReport(path, reportSetName) {
        var tags = this.findReportSetTags(reportSetName);
        var title = this.buildReportTitle(reportSetName);
        var logs = this.filterLogs(this.logs, tags);
        htmlReport(logs, title, path, this.htmlHeader, this.tagDescriptions);
    }

    consoleReportAll() {
        this.reportSets.forEach(reportSet => {
            consoleReport(this.logs, reportSet.logs);
        });
    }

    jsonReportAll(path) {
        this.reportSets.forEach(reportSet => {
            this.jsonReport(path, reportSet.title);
        });
    }

    htmlReportAll(path) {
        this.reportSets.forEach(reportSet => {
            htmlReport(path, this.logs, reportSet.logs);
        });
    }
};