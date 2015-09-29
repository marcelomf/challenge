var GraoServerCommands = function (di) {

    this.id = 'server';
    this.title = 'graoJS Server commands';
    this.actions = [
        {
            id: 'run:dev',
            method: 'runRunDev',
            desc: 'Run server on DEV environment (with node-supervisor)',
            appOnly: true,
            promptSchema: {}
        },
        {
            id: 'run:prod',
            method: 'runRunProd',
            desc: 'Run server on PROD environment (with node-forever)',
            appOnly: true,
            promptSchema: {}
        },
        {
            id: 'dump:nginx',
            method: 'runDumpNginx',
            desc: 'Dump Nginx configuration',
            appOnly: true,
            promptSchema: {}
        },
        {
            id: 'dump:apache2',
            method: 'runDumpApache2',
            desc: 'Dump Apache2 configuration',
            appOnly: true,
            promptSchema: {}
        }
    ];

    // TODO
    this.runRunDev = function (argv, prompt, schema) {

        console.log('TODO runRunDev');

    }

    // TODO
    this.runRunProd = function (argv, prompt, schema) {

        console.log('TODO runRunProd');

    }

    // TODO
    this.runDumpNginx = function (argv, prompt, schema) {

        console.log('TODO runDumpNginx');

    }

    // TODO
    this.runDumpApache2 = function (argv, prompt, schema) {

        console.log('TODO runDumpApache2');

    }

}

function onErr(err) {
    console.log(err);
    return 1;
}

module.exports = exports = GraoServerCommands;