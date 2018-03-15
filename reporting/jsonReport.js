/* eslint no-console:0 */
const fs = require('fs');
const path = require('path');

module.exports = (location, logs) => {
    fs.writeFile(location, JSON.stringify(logs, null, '\t'), err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`JSON Report written to ${path.resolve(location)}`);
        }
    });
};