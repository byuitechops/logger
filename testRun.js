const Logger = require('./newLogger.js');
const logger = new Logger('Test Run');

logger.log('Potato', { name: 'stuff' });
logger.log('Potato', { name: 'stuff2' });
logger.log('Potato', { name: 'stuff3' });
logger.log('Potato', { name: 'stuff4' });
logger.log('Potato', { name: 'stuff5' });
logger.log('Potato', { name: 'stuff6' });
logger.log('Potato', { name: 'stuff7' });
logger.log('Potato', { name: 'stuff8' });
logger.warning('potaoooootooo');
logger.warning('tomato');
logger.warning('avacado');
logger.warning('gelado');
logger.error(new Error('Oh noes!'));
logger.message('potato');

logger.createReportSet('testSet', [
    'error'
]);

logger.createReportSet('Potato', [
    'Potato',
    'error'
]);

logger.createReportSet('Warning', [
    'warning'
]);

logger.consoleReport('testSet');
logger.jsonReport('../../');
logger.jsonReportAll('../../');


logger.htmlReport('../../', 'Warning');
logger.htmlReport('../../', 'Potato');