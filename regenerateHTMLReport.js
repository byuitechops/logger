var makeReport = require('./htmlReport.js');

makeReport(null, (err, course) => {
    console.log(err);
});