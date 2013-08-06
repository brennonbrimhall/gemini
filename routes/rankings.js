
/*
 * GET rankings data.
 */

exports.rankings = function(req, res){
	var mysql = require('mysql');
	var config = require('../config');
	console.log("Database: "+config.mysql.database);
	var connection = mysql.createConnection({
		host: config.mysql.host,
		user: config.mysql.username,
		password: config.mysql.password,
		database: config.mysql.database
	});

	connection.on('error', function(err){
		console.log(err);
		res.render('error', {
			err: err
		});
	});

	connection.connect();

	connection.query("USE `"+config.mysql.database+"`;");

	connection.query("SELECT * FROM `rankings` ORDER BY `rank`;", function(err, results) {
		if (err) {
			console.log(err);
			res.render('error', {
				err: err
			});
		}
		//console.log("Successfully connected.  Got rows "+JSON.stringify(results));
		res.render('rankings', { 
			title: 'Rankings', 
			rankings: results, 
			rankings_config: config.rankings
		});
	});
	connection.end();
};