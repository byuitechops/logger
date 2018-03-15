/* eslint no-console:1 */

const fs = require('fs');
const buildHTML = require('./buildHTML.js');
const htmlTemplate = require('./HTMLtemplate.js');
const path = require('path');

module.exports = (location, logs, reportDetails) => {

    var logsObject = {
        'fatalError': [],
        'error': [],
        'warning': [],
        'message': [],
    };

    logs.forEach(log => {
        if (!logsObject[log.title]) {
            logsObject[log.title] = [];
        } else {
            logsObject[log.title].push(log);
        }
    });

    var htmlCategories = Object.keys(logsObject).map(key => buildHTML(logsObject[key]));

    reportDetails.content = htmlCategories.join('');

    var html = htmlTemplate(reportDetails);

    /* write the report */
    fs.writeFileSync(`./reports/${reportDetails.reportTitle}.html`, html);
    // eslint-disable-next-line
    console.log(`HTML Report "${reportDetails.reportTitle}" written to ${path.resolve(location)}`);
};