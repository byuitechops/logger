module.exports = (logs) => {

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

    var title = logs[0].title;

    if (title === 'error') {
        title = `<span style="color:red">Errors (${logs.length})</span>`;
    } else if (title === 'warning') {
        title = `<span style="color:yellow">Warnings (${logs.length})</span>`;
    } else if (title === 'fatalError') {
        title = `<span style="color:red">Fatal Errors (${logs.length})</span>`;
    } else if (title === 'message') {
        title = `<span style="color:#0076C6">Messages (${logs.length})</span>`;
    } else {
        title = `${logs[0].title} (${logs.length})`;
    }

    return `
        <li>
            <div class="collapsible-header">
                ${title}
            </div>
            <div class="collapsible-body">
                <table>
                    <thead>
                        <tr>
                            ${headers.join('')}
                            <th>
                                Child Module
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
};