const fs = require('fs');
const htmlTemplate = require('./HTMLtemplate.js');
const path = require('path');
const chalk = require('chalk');

function buildHTML(logs, description, disableLocation, disableTimestamp) {
    if (!description) {
        description = {
            description: ''
        };
    }

    if (logs.length === 0) {
        return null;
    }

    var rows = logs.map(log => {
        var values = Object.values(log.data).map(value => {
            return `<td>${value}</td>`;
        });
        var locationTemplate = `<td>
                                    ${log.location}
                                </td>`;
        var timestampTemplate = `<td>
                                    ${log.timestamp}
                                </td>`;

        if (disableLocation === true) locationTemplate = '';
        if (disableTimestamp === true) timestampTemplate = '';
        return `
            <tr>
                ${values.join('\n')}
                ${locationTemplate}
                ${timestampTemplate}
            </tr>
        `;
    });

    var headers = Object.keys(logs[0].data).map(header => {
        return `<th>${header}</th>`;
    });

    var title = logs[0].tag;

    if (title === 'error') {
        title = `<span style="color:red">Errors (${logs.length})</span>`;
    } else if (title === 'warning') {
        title = `<span style="color:orange">Warnings (${logs.length})</span>`;
    } else if (title === 'fatalError') {
        title = `<span style="color:red">Fatal Errors (${logs.length})</span>`;
    } else if (title === 'message') {
        title = `<span style="color:#0076C6">Messages (${logs.length})</span>`;
    } else {
        title = `${logs[0].tag} (${logs.length})`;
    }

    var locationHeader = `
        <th>
            Location
        </th>
    `;
    var timestampHeader = `
        <th>
            Timestamp
        </th>
    `;

    if (disableLocation) locationHeader = '';
    if (disableTimestamp) timestampHeader = '';

    return `
        <li>
            <div class="collapsible-header">
                ${title}
            </div>
            <div class="collapsible-body">
                <div class="description">
                    ${description.description}
                </div>
                <table>
                    <thead>
                        <tr>
                            ${headers.join('')}
                            ${locationHeader}
                            ${timestampHeader}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.join('')}
                    </tbody>
                </table>
            </div>
        </li>
    `;
}

module.exports = (logs, reportTitle, location, header, descriptions, disableLocation, disableTimestamp) => {

    var logsObject = {};

    logs.forEach(log => {
        if (!logsObject[log.tag]) {
            logsObject[log.tag] = [log];
        } else {
            logsObject[log.tag].push(log);
        }
    });

    var htmlCategories = Object.keys(logsObject).map(key => {
        var description = descriptions.find(description => description.tag === key);
        return buildHTML(logsObject[key], description, disableLocation, disableTimestamp);
    });
    htmlCategories.sort();
    console.log(htmlCategories);

    var content = htmlCategories.join('');

    var html = htmlTemplate({
        reportTitle,
        header,
        content
    });

    /* write the report */
    try {
        fs.writeFileSync(`${path.resolve(location)}/${reportTitle}.html`, html);
    } catch (e) {
        console.log(chalk.redBright(e));
    }
    // eslint-disable-next-line
    console.log(chalk.greenBright(`HTML Report "${reportTitle}" written to ${path.resolve(location)}\\${reportTitle}.html`));
};