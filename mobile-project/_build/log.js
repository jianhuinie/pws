/**
 * Created by bjhl on 15/12/17.
 */
// var log4js = require('log4js');
// console log is loaded by default, so you won't normally need to do this
// log4js.loadAppender('console');
// log4js.loadAppender('file');
// log4js.addAppender(log4js.appenders.console());
// log4js.addAppender(log4js.appenders.file(path.join(config.projectRoot,'/logs')), 'logs');

// var logger = log4js.getLogger('build');
// logger.setLevel('ERROR');

const log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups: 4,
            category: 'error'
        }
    ],
    replaceConsole: true
});