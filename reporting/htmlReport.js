const fs = require('fs');
const htmlTemplate = require('./HTMLtemplate.js');
const path = require('path');
const chalk = require('chalk');

function buildHTML(logs, description) {
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
        return `
            <tr>
                ${values.join('\n')}
                <td>
                    ${log.location}
                </td>
                <td>
                    ${log.timestamp}
                </td>
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
                            <th>
                                Location
                            </th>
                            <th>
                                Timestamp
                            </th>
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

module.exports = (logs, reportTitle, location, header, descriptions) => {

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
        return buildHTML(logsObject[key], description);
    });

    var content = htmlCategories.join('');

    var html = htmlTemplate({
        reportTitle,
        header,
        content
    });

    /* write the report */
    fs.writeFileSync(`${path.resolve(location)}/${reportTitle}.html`, html);
    // eslint-disable-next-line
    console.log(chalk.greenBright(`HTML Report "${reportTitle}" written to ${path.resolve(location)}\\${reportTitle}.html`));
};