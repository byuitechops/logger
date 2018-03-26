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

        filePaths = err.stack.map(item => item.getFileName());

        currentFile = path.basename(filePaths[0]);

        for (x = 0; x < filePaths.length; x++) {
            if (path.basename(filePaths[x]) != currentFile) {
                callingPath = path.dirname(filePaths[x]).split(path.sep);
                callingModule = callingPath[callingPath.length - 1];
                break;
            }
        }
        /* reset prepareStackTrace */
        Error.prepareStackTrace = originalPrepareStackTrace;
    } catch (e) {
        console.log('Call Location Error:', e);
    }
    return callingModule;
};