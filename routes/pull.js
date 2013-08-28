
/*
 * GET data from this server.
 */

exports.data = function(req, res){
	var config = require('../config');
	var sys = require('sys')
	var exec = require('child_process').exec;
	var child;

	//Checking to see if we have allowed others to pull
	if(config.mysql.allowOthersToPullData) {
		res.set('Content-Type', 'text/plain');

		child = exec(config.mysql.directory+"/bin/mysqldump -u "+config.mysql.username+" --databases "+config.mysql.database,
			function(error, stdout, stederr){
				res.send(stdout);
			}
		);

	//If we're not willing to send our database over (since this is potentially compromising), we state a 404 error.
	//If we were to send a 403 error instead, we would be alerting to others that we have an important page here.
	}else{
		res.status(404);
		res.send();
	}
	
};

exports.config = function(req, res){
	var config = require('../config');

	//Checking to see if we have allowed others to pull
	if(config.mysql.allowOthersToPullData) {
		res.set('Content-Type', 'text/plain');

		var sendConfig = new Object();
		sendConfig.rankings = config.rankings;
		sendConfig.image = config.image;
		sendConfig.pit = config.pit;
		sendConfig.match = config.match;
		res.send(JSON.stringify(sendConfig));

	//If we're not willing to send our database over (since this is potentially compromising), we state a 404 error.
	//If we were to send a 403 error instead, we would be alerting to others that we have an important page here.
	}else{
		res.status(404);
		res.send();
	}
	
};

exports.request = function(req, res){
	var http = require('http');
	var config = require('../config');
	var request = require('request');
	var async = require('async');

	if(config.mysql.allowSelfToPullData){
		if(req.body.server){
			request(req.body.server+'/data', 
				function(error, response, body){
					if(error){
						res.render('error', {
							err: new Error('The server could not contact '+req.body.server+'/data to pull data.' )
						});
					}else{
						var dump = body;
						request(req.body.server+'/config', 
							function(error, response, body){
								if(error){
									res.render('error', {err: new Error('The server could not contact '+req.body.server+'/config to pull configuration data.')})
								}else{
									var newConfig = JSON.parse(body);
									async.series([
										backupDatabase(),
										backupConfig(),
										loadConfig(newConfig),
										loadDatabase(dump, res)
									]);
								}
							}
						);
					}
				}
			);
		}else{
			res.render('pull');
		}	
	}else{
		res.render('error', 
			{err: new Error('You are not configured to pull data from another server.')
			}
		);
	}
	
}

function backupDatabase() {
	console.log("Backing up database");
	var config = require('../config');
	var sys = require('sys')
	var exec = require('child_process').exec;
	var fs = require('fs');

	child = exec(config.mysql.directory+"/bin/mysqldump -u "+config.mysql.username+" --databases "+config.mysql.database,
		function(error, stdout, stederr){
			var millis = new Date().getTime();
			
			fs.writeFile(millis+'.sql', stdout);
		}
	);
};

function backupConfig() {
	console.log("Backing up config");
	var config = require('../config');
	var fs = require('fs');
	var millis = new Date().getTime();		
	fs.writeFile(millis+'.json', JSON.stringify(config));

};

function loadDatabase(dump, res) {
	var config = require('../config');
	var sys = require('sys')
	var exec = require('child_process').exec;
	var fs = require('fs');
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host: config.mysql.host,
		user: config.mysql.username,
		password: config.mysql.password,
		database: config.mysql.database,
		multipleStatements: true
	});

	connection.on('error', function(err){
		console.log("ERROR WHILE LOADING NEW DATABASE: "+err);
		res.render('error', {
			err: new Error('Unable to load pulled data to databse.  Check the console for a more detailed error message.')
		});
	});

	connection.connect();
	console.log("Loading new database");
	connection.query(dump, 
		function(err, results){
			if (err) {
				res.render('error', {
					err: err
				});
			}else{
				res.render('pull', {success: true});
			}
		}
	); 
	console.log("Backing up new database");
	child = exec(config.mysql.directory+"/bin/mysqldump -u "+config.mysql.username+" --databases "+config.mysql.database,
		function(error, stdout, stederr){
			var millis = new Date().getTime();
			
			fs.writeFile(millis+'.sql', stdout);
		}
	);
}

function loadConfig(newConfig) {
	console.log('Loading new config')
	var config = require('../config');
	var fs = require('fs');

	newConfig.mysql = config.mysql;

	fs.writeFile('config.json', newConfig);
}