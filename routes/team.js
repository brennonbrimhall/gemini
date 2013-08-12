
/*
 * GET home page.
 */

exports.team = function(req, res){
	var mysql = require('mysql');
	var config = require('../config');
	var async = require('async');
	var Stats = require('fast-stats').Stats;

	console.log("database: "+config.database);
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

	var pit_data = null;
	var schedule_data = null;
	var match_data = null;
	var match_averages = new Array();
	var match_stddevs = new Array();
	var match_consistency = new Array();
	var points_average = 0;
	var points_stddev = 0;

	connection.connect();

	connection.query("USE `"+config.mysql.database+"`;"); 

	connection.query("SELECT * FROM `pit` WHERE `team` = "+connection.escape(req.param('number'))+";", 
		function(err, results) {
			console.log("Got pit data")
			if (err) {
				res.render('error', {
					err: err
				});
			}

			pit_data = results;

		}
	);
	
	connection.query("SELECT * FROM `match` WHERE `team` ="+connection.escape(req.param('number'))+" ORDER BY `match`;", 
		function(err, results){
			if(err) {
				res.render('error', {
					err: err
				});
			}
			match_data = results;
			//console.log(JSON.stringify(match_data));

			//Calculating averages
			for (var i = 0; i < config.match.length; i++) {
				var sum = 0;
				console.log(config.match[i]['name'])
				for (var j = 0; j < match_data.length; j++) {
					console.log(match_data[j][config.match[i]['field']])
					sum += match_data[j][config.match[i]['field']];
					//stats.push(Number());
				};
				var average = sum / match_data.length;

				var deviation = 0;
				for (var j = 0; j < match_data.length; j++) {
					deviation += Math.pow((match_data[j][config.match[i]['field']] - average), 2);
					//stats.push(Number());
				};
				var stddev = Math.pow((deviation / match_data.length), .5);

				//console.log("Average: "+average+"\tStddev: "+stddev);

				match_averages[config.match[i]['field']] = average;
				match_stddevs[config.match[i]['field']] = stddev;
				match_consistency[config.match[i]['field']] = match_averages[config.match[i]['field']] - .44* match_stddevs[config.match[i]['field']];
			};

			//Now calculating average and stddev for point contribution
			var sum = 0;
			var values = new Array();

			//Generating point contributions from match data
			for (var i = 0; i < match_data.length; i++) {
				var points = 0;
				for (var j = 0; j < config.match.length; j++) {
					points += match_data[i][config.match[j]['field']]*config.match[j]['points'];
				};
				values.push(points);
			}

			for (var i = 0; i < values.length; i++) {
				sum+=values[i];
			}

			points_average = sum / values.length;

			var deviation = 0;
			for (var j = 0; j < values.length; j++) {
				deviation += Math.pow((values[j] - points_average), 2);
				//stats.push(Number());
			}
			points_stddev = Math.pow((deviation / values.length), .5);
		}
	);

	connection.query("SELECT * FROM `schedule` WHERE `red1` = "+connection.escape(req.param('number'))+
		" OR `red2` = "+connection.escape(req.param('number'))+
		" OR `red3` = "+connection.escape(req.param('number'))+
		" OR `blue1` = "+connection.escape(req.param('number'))+
		" OR `blue2` = "+connection.escape(req.param('number'))+
		" OR `blue3` = "+connection.escape(req.param('number'))+";", 
		function(err, results) {
			console.log("Got schedule data")
			if(err) {
				res.render('error', {
					err: err
				});
			}
			schedule_data = results;
			console.log(pit_data);
			res.render('team', {
				title: 'FRC'+req.param('number'), 
				number: req.param('number'), 

				image: config.image,

				pit: config.pit,
				pit_data: pit_data[0],

				match_data: match_data,
				match: config.match,
				match_averages: match_averages,
				match_stddevs: match_stddevs,

				points_average: points_average,
				points_stddev: points_stddev,

				schedule: schedule_data 
			});
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

	connection.query("SELECT DISTINCT(`team`) FROM `match` ORDER BY `team`;", function(err, results) {
		if (err) {
			console.log(err);
			res.render('error', { 
				title: 'Pit Data Entry', 
				data_inputed: false, 
				err: err
			});
		}

		console.log(JSON.stringify(results));
		res.render('team-lookup', {
			title: 'Team Lookup', 
			teams: results
		});

	});	
};