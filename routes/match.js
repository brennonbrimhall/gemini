
/*
 * GET home page.
 */

exports.match = function(req, res){
	var mysql = require('mysql');
	var config = require('../config');
	var async = require('async');
	console.log("database: "+config.mysql.database);
	var connection = mysql.createConnection({
		host: config.mysql.host,
		user: config.mysql.username,
		password: config.mysql.password,
		database: config.mysql.database,
	});

	connection.on('error', function(err){
		res.render('error', {
			err: err
		});
	});

	var pit_data = new Array();
	var schedule_data = new Array();
	var match_data = new Array();

	connection.connect();

	connection.query("USE `"+config.mysql.database+"`;"), function(err, rows, fields) {
		if (err) {
			res.render('error', {
				err: err
			});
		}
	}

	//Grabbing schedule info for this match
	connection.query("SELECT * FROM `schedule` WHERE `match` = "+req.param('number')+";", 
		function(err, results) {
			if(err) {
				res.render('error', {
					err: err
				});
			}
			schedule_data = results;

			//Starting massive callback:

			//Grabbing match data for teams in this match
			connection.query("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['red1']+" ORDER BY `match`;", 
				function(err, results){
					if(err) {
						res.render('error', {
							err: err
						});
					}
					match_data['red1'] = results;
				}
			);

			connection.query("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['red2']+" ORDER BY `match`;", 
				function(err, results){
					if(err) {
						res.render('error', {
							err: err
						});
					}
					match_data['red2'] = results;
				}
			);

			connection.query("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['red3']+" ORDER BY `match`;", 
				function(err, results){
					if(err) {
						res.render('error', {
							err: err
						});
					}
					match_data['red3'] = results;
				}
			);

			connection.query("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['blue1']+" ORDER BY `match`;", 
				function(err, results){
					if(err) {
						res.render('error', {
							err: err
						});
					}
					match_data['blue1'] = results;
				}
			);

			connection.query("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['blue2']+" ORDER BY `match`;", 
				function(err, results){
					if(err) {
						res.render('error', {
							err: err
						});
					}
					match_data['blue2'] = results;
				}
			);
			
			connection.query("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['blue3']+" ORDER BY `match`;", 
				function(err, results){
					if(err) {
						res.render('error', {
							err: err
						});
					}
					match_data['blue3'] = results;
				}
			);

			//Grabbing pit data for all teams in this match
			connection.query("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['red1']+";", 
				function(err, results) {
					console.log("Got pit data")
					if (err) {
						res.render('error', {
							err: err
						});
					}

					pit_data['red1'] = results[0];
				}
			);

			connection.query("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['red2']+";", 
				function(err, results) {
					console.log("Got pit data")
					if (err) {
						res.render('error', {
							err: err
						});
					}

					pit_data['red2'] = results[0];
				}
			);

			connection.query("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['red3']+";", 
				function(err, results) {
					console.log("Got pit data")
					if (err) {
						res.render('error', {
							err: err
						});
					}

					pit_data['red3'] = results[0];
				}
			);

			connection.query("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['blue1']+";", 
				function(err, results) {
					console.log("Got pit data")
					if (err) {
						res.render('error', {
							err: err
						});
					}

					pit_data['blue1'] = results[0];
				}
			);

			connection.query("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['blue2']+";", 
				function(err, results) {
					console.log("Got pit data")
					if (err) {
						res.render('error', {
							err: err
						});
					}

					pit_data['blue2'] = results[0];
				}
			);

			connection.query("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['blue3']+";", 
				function(err, results) {
					console.log("Got pit data")
					if (err) {
						res.render('error', {
							err: err
						});
					}

					pit_data['blue3'] = results[0];

					res.render('match', {
						title: 'Match '+req.param('number'), 
						number: req.param('number'), 

						image: config.image,

						pit: config.pit,
						pit_data: pit_data,

						match_data: match_data,
						match: config.match,

						schedule: schedule_data 
					});

				}
			);
		}
	);


};

exports.lookup = function(req, res){
	var mysql = require('mysql');
	var config = require('../config');
	var async = require('async');
	console.log("database: "+config.mysql.database);
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
			title: 'Team Lookup', 
			data_inputed: false, 
			err: err
		});
	});

	connection.connect();

	connection.query("USE `"+config.mysql.database+"`;");

	connection.query("SELECT DISTINCT(`match`) FROM `schedule`;", function(err, results) {
		if (err) {
			console.log(err);
			res.render('error', { 
				title: 'Match Lookup', 
				data_inputed: false, 
				err: err
			});
		}

		console.log(JSON.stringify(results));
		res.render('match-lookup', {
			title: 'Match Lookup', 
			matches: results
		});

	});	
};