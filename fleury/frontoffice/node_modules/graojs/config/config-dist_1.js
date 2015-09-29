var path = require('path'), rootPath = path.normalize(__dirname) + '/..';

module.exports = exports = {
	port : 80,
	db : 'mongodb://localhost/grao',
	rootPath : rootPath,
	view : rootPath + '/bundles',
	locales : rootPath + '/config/locales',
	name : 'GrãoJS - Beta',
	log : {
		transport : {
			console : {
				colorize: true,
				json : false,
				timestamp : true,
				level : 'info'
			},
			file : {
				filename : rootPath + '/log/grao.log',
				json : false,
				level : 'error'
			}
		},
		exception : {
			console : {
				colorize: true,
				json : false,
				timestamp : true,
				level : 'info'
			},
			file : {
				filename : rootPath + '/log/grao.log',
				json : false,
				level : 'error'
			}
		},
	},
	facebook : {
		clientID : "APP_ID",
		clientSecret : "APP_SECRET",
		callbackURL : "http://localhost:3000/auth/facebook/callback"
	},
	twitter : {
		clientID : "CONSUMER_KEY",
		clientSecret : "CONSUMER_SECRET",
		callbackURL : "http://localhost:3000/auth/twitter/callback"
	},
	github : {
		clientID : 'APP_ID',
		clientSecret : 'APP_SECRET',
		callbackURL : 'http://localhost:3000/auth/github/callback'
	},
	google : {
		clientID : "APP_ID",
		clientSecret : "APP_SECRET",
		callbackURL : "http://localhost:3000/auth/google/callback"
	}
};