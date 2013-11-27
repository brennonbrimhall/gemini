exports.edit = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var scheduledb = eventHelper.getScheduleDatabase();
	var matchdb = eventHelper.getMatchDatabase();
	var pitdb = eventHelper.getPitDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		var schedule = scheduledb.selectAll();
		var match = matchdb.selectAll();
		var pit = pitdb.selectAll();
		res.render('edit', {req: req, schedule: schedule, match: config.match, pit: config.pit, match_data: match, pit_data: pit, title: 'Edit Database'});
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getEditSchedule = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getScheduleDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		var result = db.select('id', req.param('id'));
		res.render('schedule-edit', {req: req, schedule: result[0], teams: config.teams, maxMatchNumber: config.maxMatchNumber, title: 'Edit Schedule Entry'});
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.postEditSchedule = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getScheduleDatabase();
	
	try{
		var object = {};
		object.match = req.body.match;
		object.red1 = req.body.red1;
		object.red2 = req.body.red2;
		object.red3 = req.body.red3;
		object.blue1 = req.body.blue1;
		object.blue2 = req.body.blue2;
		object.blue3 = req.body.blue3;
		object.redScore = req.body.redScore;
		object.blueScore = req.body.blueScore;
		db.update(object, req.param('id'));
		db.save();
		res.redirect('/edit#schedule');
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getDeleteSchedule = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getScheduleDatabase();
	
	try{
		db.delete(req.param('id'));
		db.save();
		res.redirect('/edit#schedule');
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getAddSchedule = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();
	
	try{
		res.render('schedule-add', {req: req, teams: config.teams, maxMatchNumber: config.maxMatchNumber, title: 'Add Schedule Entry'});
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.postAddSchedule = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getScheduleDatabase();
	
	try{
		var object = {};
		object.match = req.body.match;
		object.red1 = req.body.red1;
		object.red2 = req.body.red2;
		object.red3 = req.body.red3;
		object.blue1 = req.body.blue1;
		object.blue2 = req.body.blue2;
		object.blue3 = req.body.blue3;
		object.redScore = req.body.redScore;
		object.blueScore = req.body.blueScore;
		db.insert(object);
		db.save();
		res.redirect('/edit');
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getEditMatchEntry = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getMatchDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		var result = db.select('id', req.param('id'));
		res.render('match-entry-edit', {req: req, match_data: result[0], teams: config.teams, match: config.match, maxMatchNumber: config.maxMatchNumber, title: 'Edit Match Entry'});
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.postEditMatchEntry = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getMatchDatabase();
	var config = eventHelper.getEventConfig();
	var Stats = require('brennonbrimhall-stats');
	
	try{
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
	
		db.update(object, req.param('id'));
		db.save();
		
		var match_data = db.select('team', req.body.team);
		console.log('[Match Data] '+match_data);
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
			averagesdb.update(match_averages, id[0].id)
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
			
		
		res.redirect('/edit#match');
	
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getDeleteMatchEntry = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getMatchDatabase();
	
	try{
		db.delete(req.param('id'));
		db.save();
		res.redirect('/edit#match');
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getEditPit = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getPitDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		var result = db.select('id', req.param('id'));
		console.log(result);
		res.render('pit-edit', { 
			title: 'Edit Pit Entry', 
			data_recieved: false, 
			pit: config.pit,
			teams: config.teams,
			req: req,
			pit_data: result[0]
		});
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.postEditPit = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getPitDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		var object = {};
		object.team = req.body.team;
		
		for(var i = 0; i<config.pit.length; i++){
			object[config.pit[i].field] = req.body[config.pit[i].field];
		}
		
		db.update(object, req.param('id'));
		db.save();
		res.redirect('/edit#pit');
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getDeletePit = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getPitDatabase();
	
	try{
		db.delete(req.param('id'));
		db.save();
		res.redirect('/edit#pit');
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};