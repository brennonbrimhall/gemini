
/*
 * GET match data entry form; if there is data, submit.
 */

exports.get = function(req, res){
	var mysql = require('mysql');
	var config = require('../config');

	res.render('match-entry', { 
		title: 'Match Data Entry', 
		data_recieved: false, 
		match: config.match,
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
			title: 'Match Data Entry', 
			data_inputed: true, 
			err: err
		});
	});

	//Building query string...
	var query = "INSERT INTO `match` (";
	for (var i = 0; i < config.match.length; ++i){
		if(i == 0){
			query = query + "`"+config.match[i]['field']+"`";
		}else{
			query = query + ", `"+config.match[i]['field']+"`";
		}
		
	}
	query = query + ") VALUES (";
	for (var i = 0; i < config.match.length; ++i){
		if(i == 0){
			query = query + connection.escape(req.body[config.match[i]['field']])+"";
		}else{
			query = query + ", " + connection.escape(req.body[config.match[i]['field']])+"";	
		}
		
	}
	query = query + ");";

	//Connecting to database
	connection.connect();

	connection.query("USE `"+config.mysql.database+"`;");

	connection.query(query, function(err) {
		if (err) {
			console.log(err);
			res.render('error', { 
				title: 'Match Data Entry', 
				data_inputed: true, 
				err: err
			});
		}else{
			console.log("No errors, rendering.");
			res.render('match-entry', { 
				title: 'Match Data Entry', 
				data_recieved: true, 
				error: false,
				match: config.match
			});				
		}
	});

	connection.end();
};