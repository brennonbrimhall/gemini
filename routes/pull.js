
/*
 * GET database from this server.
 */

exports.data = function(req, res){
	var config = require('../config');
	var fs = require("fs");

	//Checking to see if we have allowed others to pull
	if(config.mysql.allowOthersToPullData) {
		fs.readFile('database.db', function (err, data) {
			if (err) throw err;
			res.set('Content-Type', 'text/plain');
			res.send(data);
		});

	//If we're not willing to send our database over (since this is potentially compromising), we state a 404 error.
	//If we were to send a 403 error instead, we would be alerting to others that we have an important page here.
	}else{
		res.status(404);
		res.send();
	}
	
};

/*
 * GET JSON document of available pictures.
 */

exports.pictures = function(req, res){
	var fs = require("fs");
	
	fs.readdir('./public/pictures/', function(err, files){
		if(err){
			res.status(500);
			res.send();
			console.log(err);
		}else{
			res.set('Content-Type', 'text/plain');
			res.send(JSON.stringify(files));
		}
	});
};

/*
 * GET configuration from this server.
 */

exports.config = function(req, res){
	var config = require('../config');

	//Checking to see if we have allowed others to pull
	if(config.mysql.allowOthersToPullData) {
		res.set('Content-Type', 'text/plain');

		var sendConfig = {};
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

/*
 * GET pull from another server.
 */

exports.request = function(req, res){
	var config = require('../config');
	var request = require('request');
	var async = require('async');

	//Checking to see if we have allowed ourselves to pull data
	if(config.mysql.allowSelfToPullData){
		if(req.body.server){
			request(req.body.server+'/data',
				function(error, response, body){
					if(error){
						res.render('error', {
							err: new Error('The server could not contact '+req.body.server+'/data to pull data.' )
						});
					}else{
						var data = body;
						request(req.body.server+'/config', 
							function(error, response, body){
								if(error){
									res.render('error', {err: new Error('The server could not contact '+req.body.server+'/config to pull configuration data.')});
								}else{
									try{
										var newConfig = JSON.parse(body);
									}catch(e){
										res.render('error', {err: new Error('Unable to interpret response from '+req.body.server+'/config.  Please verify that the server is configured to allow data pulling, and that the entered server is correct.  You may refresh this page to try again.')});
										return;
									}
									
									request(req.body.server+'/pictures', function(error, response, body){
										if(error){
											res.render('error', {err: new Error('The server could not contact '+req.body.server+'/config to pull picture data.')});
										}else{
											var pictures = body; 
											
											async.series([
												backupDatabase(),
												backupConfig(),
												loadConfig(newConfig),
												loadDatabase(data, res),
												loadPictures(req, pictures)
											]);
										}
									});
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
			{err: new Error('You are not configured to pull data from another server.  Change "allowSelfToPullData" in your configuration file to true.')
			}
		);
	}
	
};

function backupDatabase() {
	console.log("[PULL] Backing up database");
	var fs = require('fs');
	
	fs.renameSync("database.db", new Date().getTime()+".db");
}

function backupConfig() {
	console.log("[PULL] Backing up config");
	var fs = require('fs');	
	fs.renameSync('config.json', new Date().getTime()+".json");

}

function loadDatabase(dump, res) {
	console.log('[PULL] Loading new database');
	var fs = require('fs');
	fs.writeFileSync('database.db', dump);
}

function loadConfig(newConfig) {
	console.log('[PULL] Loading new config');
	var fs = require('fs');

	fs.writeFileSync('config.json', newConfig);
}

function loadPictures(req, pictures) {
	var fs = require("fs");
	var request = require("request");

	for(var i = 0; i < pictures.length; ++i){
		console.log('[PULL] Loading picture '+pictures[i]);
		request(req.body.server+'/pictures/'+pictures[i]).pipe(fs.createWriteStream('./pictures/'+pictures[i]));
	}
}