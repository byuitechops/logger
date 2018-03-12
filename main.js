/* eslint-env node, es6 */

const asyncLib = require('async');
const agenda = require('./agenda.js');

module.exports = (data, finalCallback) => {

    var childModules = [...data.preImportModules, ...data.postImportModules];

    agenda.setChildModules(childModules);

    const modules = [
        asyncLib.constant(data),
        ...agenda.prepare,
        ...agenda.preImport,
        ...agenda.importCourse,
        ...agenda.postImport,
        ...agenda.cleanUp
    ];

    asyncLib.waterfall(modules, finalCallback);

};