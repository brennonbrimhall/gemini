
/*
 * GET match schedule data.
 */

exports.schedule = function(req, res){
	var mysql = require('mysql');
	var config = require('../config');
	//console.log("database: "+config.database);
	var connection = mysql.createConnection({
		host: config.mysql.host,
		user: config.mysql.username,
		password: config.mysql.password,
		database: config.mysql.database,
	});

	connection.on('error', function(err){
		console.log(err);
		res.render('error', {
			err: err
		});
	});

	connection.connect();

	connection.query("USE `"+config.mysql.database+"`;");

	connection.query("SELECT * FROM `schedule`;", function(err, results) {
		if (err){
			res.render('error', {
				err: err
			});
		}
		res.render('schedule', { title: 'Schedule', schedule: results});
	});

	connection.end();

};