
/*
 * GET database from this server.
 */

exports.data = function(req, res){
	var eventHelper = require('./eventHelper');
	var config = require('../config.json');

	//Checking to see if we have allowed others to pull
	if(config.pull.allowOthersToPullData) {
		try {
			var data = {};
			data.config = eventHelper.getEventConfig();
			data.match = eventHelper.getMatchData();
			data.pit = eventHelper.getPitData();
			data.averages = eventHelper.getAveragesData();
			data.stddevs = eventHelper.getStdDevData();
			data.schedule = eventHelper.getScheduleData();
			res.set('Content-Type', 'application/json');
			res.set('Content-Disposition', 'attachment; filename=\"'+config.currentEvent+'-data-'+(new Date()).toUTCString()+'.json\"');
			res.send(data);
		}catch(err){
			res.render('error', {
				req: req,
				title: 'Error',
				err: err
			});
		}

	//If we're not willing to send our data, configuration, and other stuff over (since this is potentially compromising), we state a 403 error.
	}else{
		res.status(403);
		res.send();
	}
	
};

/*
 * GET render upload data extract form.
 */

exports.getUpload = function(req, res){
	var config = require('../config');

	//Checking to see if we have allowed others to pull
	if(config.pull.allowSelfToPullData) {
		res.render('uploadData', { 
			title: 'Upload Data',
			req: req
		});

	//If we're not willing to send our database over (since this is potentially compromising), we state a 403 error.
	}else{
		res.status(403);
		res.send();
	}
	
};

/*
 * POST upload data extract to server
 */

exports.postUpload = function(req, res){
	var eventHelper = require("./eventHelper");
	var config = eventHelper.getEventConfig();
	var fs = require('fs');
	
	try{
		//Validating file; don't want to corrupt anything.
		if(req.files.data.type !== 'application/octet-stream'){
			throw new Error('The type of document you uploaded doesn\'t have a MIME type of application/json.');
		}else{
			var data = JSON.parse(fs.readFileSync(req.files.data.path));
			if(typeof data.config === 'undefined'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper config attribute.');
			}
			if(typeof data.match === 'undefined'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match attribute.');
			}
			if(typeof data.pit === 'undefined'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper pit attribute.');
			}
			if(typeof data.averages === 'undefined'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper averages attribute.');
			}
			if(typeof data.stddevs === 'undefined'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper stddevs attribute.');
			}
			if(typeof data.schedule === 'undefined'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper schedule attribute.');
			}
			fs.writeFileSync(eventHelper.getCurrentEvent()+".config", JSON.stringify(data.data));
			fs.writeFileSync(eventHelper.getCurrentEvent()+".match", JSON.stringify(data.match));
			fs.writeFileSync(eventHelper.getCurrentEvent()+".pit", JSON.stringify(data.pit));
			fs.writeFileSync(eventHelper.getCurrentEvent()+".averages", JSON.stringify(data.averages));
			fs.writeFileSync(eventHelper.getCurrentEvent()+".stddevs", JSON.stringify(data.stddevs));
			fs.writeFileSync(eventHelper.getCurrentEvent()+".schedule", JSON.stringify(data.schedule));
			res.redirect('/');
		}
	}catch(err){
		res.render('error', {
			req: req,
			title: 'Error',
			err: err
		});
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