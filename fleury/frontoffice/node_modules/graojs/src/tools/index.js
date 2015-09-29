var GraoTools = require('./GraoTools');

try {
/*
    this.logger = new require('./GraoLogger')(this.config);
    this.logger.info('{ ' + this.config.name + ' }');

    this.loader = new (require('./GraoLoader'))({
        config: this.config
    });

    this.event = new (require('./GraoEvent'))({
        logger: this.logger,
        styles: styles,
        states: states,
        stackTrace: stackTrace,

        name: 'kernel',
        message: 'loading...',
        mandatory: true,
        style: styles.PRIMARY,
        state: states.INITIAL
    }).present().log('info');
*/
    var tools = new GraoTools({
        commands: new (require('../commands/GraoCommands'))(),
        server: new (require('../commands/GraoServerCommands'))(),
        generator: new (require('../commands/GraoGeneratorCommands'))()
    });
    tools.init();
} catch (exception) {
    console.log('Error: ' + exception);
    process.exit(-1);
}

module.exports = exports = tools;
