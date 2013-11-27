
/*
 * GET match data entry form; if there is data, submit.
 */

exports.get = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();

	res.render('match-entry', { 
		title: 'Match Data Entry', 
		data_recieved: false, 
		auto: config.match.auto,
		teleop: config.match.teleop,
		endgame: config.match.endgame,
		other: config.match.other,
		teams: config.teams,
		maxMatchNumber: config.maxMatchNumber,
		req: req
	});
};

exports.post = function(req, res){
	var Stats = require('brennonbrimhall-stats');
	var eventHelper = require('../helpers/eventHelper');
    var db = eventHelper.getMatchDatabase();
	var config = eventHelper.getEventConfig();

	try{
		//Validating teams only; everything else should be done client-side.
		//Special case for teams; discrete set of possibilities
		var teams = '';
		for (var i = 0; i < config.teams.length; ++i){
			if(i === 0){
				teams = teams+config.teams[i];	
			}else{
				teams = teams+'|'+config.teams[i];
			}
		}
		var teamsRegex = new RegExp(teams);
	
		if(!teamsRegex.test(String(req.body.team))){
			res.render('error', { 
				title: 'Error',
				err: new Error('Team number is invalid.'),
				data_inputed: true,
				req: req
			});
			return;
		}
		
		//Also checking match number.
		if(!(Number(req.body.match) > 0) && !(Number(req.body.match) <= config.maxMatchNumber)){
			res.render('error', { 
				title: 'Error',
				err: new Error('Match number is invalid.'),
				data_inputed: true,
				req: req
			});
			return;
		}

		//Building object to save
		var object = {};
		
		object.team = req.body.team;
		object.match = req.body.match;
		
		for (var i = 0; i < config.match.auto.length; ++i){
			object[config.match.auto[i].field] = req.body[config.match.auto[i].field];
		}
		
		for (var i = 0; i < config.match.teleop.length; ++i){
			object[config.match.teleop[i].field] = req.body[config.match.teleop[i].field];
		}
		
		for (var i = 0; i < config.match.endgame.length; ++i){
			object[config.match.endgame[i].field] = req.body[config.match.endgame[i].field];
		}
		
		for (var i = 0; i < config.match.other.length; ++i){
			object[config.match.other[i].field] = req.body[config.match.other[i].field];
		}
		
		try{
			db.insert(object);
			db.save();
		}catch(err){
			res.render('error', {
				req: req,
				title: 'Error',
				err: err,
				data_inputed: true
			});
		}

		var match_data = db.select('team', req.body.team);
		var match_averages = {};
		var match_stddevs = {};

		//Calculating averages
		//Auto
		for (var i = 0; i < config.match.auto.length; i++) {
			var data = [];
			for (var j = 0; j < match_data.length; j++) {
				data.push(Number(match_data[j][config.match.auto[i].field]));
			}
			var stats = new Stats(data);
			var average = stats.mean();
			var stddev = stats.standardDeviation();
			match_averages[config.match.auto[i].field] = average;
			match_stddevs[config.match.auto[i].field] = stddev;
		}
		
		//Teleop
		for (var i = 0; i < config.match.teleop.length; i++) {
			var data = [];
			for (var j = 0; j < match_data.length; j++) {
				data.push(Number(match_data[j][config.match.teleop[i].field]));
			}
			var stats = new Stats(data);
			var average = stats.mean();
			var stddev = stats.standardDeviation();
			match_averages[config.match.teleop[i].field] = average;
			match_stddevs[config.match.teleop[i].field] = stddev;
		}
		
		//Endgame
		for (var i = 0; i < config.match.endgame.length; i++) {
			var data = [];
			for (var j = 0; j < match_data.length; j++) {
				data.push(Number(match_data[j][config.match.endgame[i].field]));
			}
			var stats = new Stats(data);
			var average = stats.mean();
			var stddev = stats.standardDeviation();
			match_averages[config.match.endgame[i].field] = average;
			match_stddevs[config.match.endgame[i].field] = stddev;
		}
		
		//Other
		for (var i = 0; i < config.match.other.length; i++) {
			var data = [];
			for (var j = 0; j < match_data.length; j++) {
				data.push(Number(match_data[j][config.match.other[i].field]));
			}
			var stats = new Stats(data);
			var average = stats.mean();
			var stddev = stats.standardDeviation();
			match_averages[config.match.other[i].field] = average;
			match_stddevs[config.match.other[i].field] = stddev;
		}
		
		match_averages.team = req.body.team;
		match_stddevs.team = req.body.team;
		
		//updating averages entry
		var averagesdb = eventHelper.getAveragesDatabase();
		var id = averagesdb.selectOne('team', req.body.team);
		if(id){
			averagesdb.update(match_averages, id[0].id);
		}else{
			averagesdb.insert(match_averages);	
		}
		averagesdb.save();
		
		//Updating stddev entry
		var stddevsdb = eventHelper.getStdDevDatabase();
		var id = stddevsdb.selectOne('team', req.body.team);
		if(id){
			stddevsdb.update(match_stddevs, id[0].id);
		}else{
			stddevsdb.insert(match_stddevs);	
		}
		stddevsdb.save();
		
		res.render('match-entry', { 
			title: 'Match Data Entry', 
			data_recieved: true, 
			auto: config.match.auto,
			teleop: config.match.teleop,
			endgame: config.match.endgame,
			other: config.match.other,
			teams: config.teams,
			maxMatchNumber: config.maxMatchNumber,
			req: req
		});
	}catch(err){
		res.render('error', {
			req: req,
			title: 'Error',
			err: err,
			data_inputed: true
		});
	}
};