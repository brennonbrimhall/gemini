
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
	var sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database('database.db');
	var config = require('../config');

	db.on('error', function(err) {
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
	query = query + ") VALUES ("+req.body.team+"";
	for (var i = 0; i < config.pit.length; ++i){
		query = query + ", '"+req.body[config.pit[i]['field']]+"'";
	}
	query = query + ");";
	
	console.log(query);

	db.all(query, function(err) {
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
	
	db.close();
};