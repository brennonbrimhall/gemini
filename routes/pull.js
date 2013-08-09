
/*
 * GET data from this server.
 */

exports.data = function(req, res){
	var config = require('../config');
	var sys = require('sys')
	var exec = require('child_process').exec;
	var child;

	//Checking to see if we have allowed ourselves to pull
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

exports.request = function(req, res){
	var http = require('http');
	var config = require('../config');
	if(config.mysql.allowSelfToPullData){
		if(req.body.server){

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
