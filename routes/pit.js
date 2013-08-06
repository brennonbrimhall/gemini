
/*
 * GET pit data entry form; if there is data, submit.
 */

exports.get = function(req, res){
	var mysql = require('mysql');
	var config = require('../config');

	res.render('pit', { 
		title: 'Pit Data Entry', 
		data_recieved: false, 
		pit: config.pit,
	});
};

exports.post = function(req, res){
	var mysql = require('mysql');
	var config = require('../config');
	var async = require('async');
	var connection = mysql.createConnection({
		host: config.mysql.host,
		user: config.mysql.username,
		password: config.mysql.password,
		database: config.mysql.database,
	});

	//Setting up response in case of error with no callback
	connection.on('error', function(err) {
		console.log(err);
		res.render('error', { 
			title: 'Pit Data Entry', 
			data_inputed: true, 
			err: err
		});
	});

	//Building query string...
	var query = "INSERT INTO `pit` (`team`";
	for (var i = 0; i < config.pit.length; ++i){
		query = query + ", `"+config.pit[i]['field']+"`";
	}
	query = query + ") VALUES ("+connection.escape(req.body.team)+"";
	for (var i = 0; i < config.pit.length; ++i){
		query = query + ", "+connection.escape(req.body[config.pit[i]['field']])+"";
	}
	query = query + ");";

	//Connecting to database
	connection.connect();

	connection.query("USE `"+config.mysql.database+"`;");

	connection.query(query, function(err) {
		if (err) {
			console.log(err);
			res.render('error', { 
				title: 'Pit Data Entry', 
				data_inputed: true, 
				err: err
			});
		}else{
			console.log("No errors, rendering.");
			res.render('pit', { 
				title: 'Pit Data Entry', 
				data_recieved: true, 
				error: false,
				pit: config.pit
			});				
		}
	});

	connection.end();
};