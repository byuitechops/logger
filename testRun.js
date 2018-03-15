const Logger = require('./main.js');
const logger = new Logger();

logger.log('Potato', { name: 'stuff' });
logger.warning('potaoooootooo');
logger.error(new Error('Oh noes!'));
logger.message('potato');

logger.consoleReport();
logger.htmlReport('.', 'Test Report');