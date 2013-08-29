
/*
 * GET nice big table.
 */

exports.table = function(req, res){
	var mysql = require('mysql');
	var config = require('../config');
	var async = require('async');

	var distinct_teams = null;
	var team_averages = [];

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

	connection.connect();

	connection.query("USE `"+config.mysql.database+"`;"); 

	connection.query("SELECT DISTINCT(`team`) FROM `match` ORDER BY `team`;", 
		function(err, results) {

			if (err) {
				res.render('error', {
					err: err
				});
			}

			distinct_teams = results;
			
			for (var i = 0; i < distinct_teams.length; i++) {
				getAveragesForTeam(distinct_teams[i].team, team_averages, res);
			};
			
			setTimeout(function(){
				team_averages.sort(function (a,b) {
				if (a['points contributed'] < b['points contributed'])
					return 1;
				if (a['points contributed'] > b['points contributed'])
					return -1;
				return 0;
				});
				res.render('table', {averages: team_averages, match: config.match});

				connection.end();
			}, 2000);
		}
	);
};

function getAveragesForTeam(team, team_averages, res){
	var mysql = require('mysql');
	var config = require('../config');
	var averages = new Object();

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

	connection.connect();

	connection.query("USE `"+config.mysql.database+"`;"); 
	connection.query("SELECT * FROM `match` WHERE `team` ="+connection.escape(team)+" ORDER BY `match`;", 
	function(err, results){
		if(err) {
			res.render('error', {
				err: err
			});
		}
		match_data = results;
		//team_averages[String(team)] = new Array();
		
		//Calculating averages
		for (var i = 0; i < config.match.length; i++) {
			var team1=team;
			var sum = 0;
			for (var j = 0; j < match_data.length; j++) {
				//console.log(match_data[j][config.match[i]['field']])
				sum += match_data[j][config.match[i]['field']];
				//stats.push(Number());
			};

			var average = sum / match_data.length;
			//console.log(team+"\t"+[config.match[i]['field']]+"\t"+average);
			averages[config.match[i]['field']] = average;
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
		averages['points contributed'] = points_average;

		var deviation = 0;
		for (var j = 0; j < values.length; j++) {
			deviation += Math.pow((values[j] - points_average), 2);
		}
		points_stddev = Math.pow((deviation / values.length), .5);
		
		team_averages.push(averages);
		connection.end();
	}
	);
}