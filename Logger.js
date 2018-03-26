const htmlReport = require('./reporting/htmlReport.js');
const jsonReport = require('./reporting/jsonReport.js');
const consoleReport = require('./reporting/consoleReport.js');
const getCallingModule = require('./logging/getCallingModule.js');
const consoleMe = require('./logging/console.js');
const moment = require('moment');

module.exports = class Logger {

    constructor(title) {
        this.logs = [];
        this.reportTitle = title;
        this.reportSets = [];
        this.htmlHeader = '';
        this.logHeader = '<div class="header1">Logs</div>';
        this.tagDescriptions = [];
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
        consoleMe(logObj);
    }

    warning(message) {
        this.log('warning', {
            message: message
        });
    }

    error(err) {
        this.log('error', {
            message: err.message,
            stack: err.stack
        });
    }

    fatalError(err) {
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
        htmlReport(logs, title, path, this.htmlHeader);
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