var winston = require('winston');
var GraoLogger = function(config) {
	
	GraoLogger = new (winston.Logger)({
		transports : [
				new (winston.transports.Console)(config.log.transport.console),
				new winston.transports.File(config.log.transport.file) ],
		exceptionHandlers : [
				new (winston.transports.Console)(config.log.transport.console),
				new winston.transports.File(config.log.transport.file) ],
		exitOnError : false
	});

	return GraoLogger;
};

module.exports = exports = GraoLogger;