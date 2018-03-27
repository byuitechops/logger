const path = require('path');

module.exports = () => {

    /* Stack Overflow credit: https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function/29581862#29581862 */
    var callingModule, filePaths, x, callingPath, err, currentFile,
        originalPrepareStackTrace = Error.prepareStackTrace; /* So we don't lose the prepareStackTrace */
    try {
        err = new Error();
        currentFile;
        Error.prepareStackTrace = function (err, stack) {
            return stack;
        };

        /* Get all the strack trace filepaths */
        filePaths = err.stack.map(item => item.getFileName());
        /* Get the calling path by skipping any paths that have "logger" in them */
        callingPath = filePaths.find(p => !p.toLowerCase().includes('logger'));
        /* Split the calling path */
        callingPathArr = callingPath.split(path.sep);
        /* Get the calling module folder name and filename */
        callingModule = callingPath.split('node_modules')[1].slice(1);

        /* reset prepareStackTrace */
        Error.prepareStackTrace = originalPrepareStackTrace;
    } catch (e) {
        console.log('Call Location Error:', e);
    }
    return callingModule;
};