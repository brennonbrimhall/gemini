
/*
 * GET match data entry form; if there is data, submit.
 */

exports.get = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();

	res.render('cycle-entry', { 
		title: 'Cycle Data Entry', 
		data_recieved: false,
		cycle: config.cycle,
		teams: config.teams,
		maxMatchNumber: config.maxMatchNumber,
		req: req
	});
};

exports.getWithValues = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();
	var team = req.params.team;
	var match = req.params.match;
	var possession = req.params.possession;

	res.render('cycle-entry', { 
		title: 'Cycle Data Entry', 
		data_recieved: false,
		cycle: config.cycle,
		teams: config.teams,
		team: team,
		match: match,
		possession: possession,
		maxMatchNumber: config.maxMatchNumber,
		req: req
	});
};

exports.post = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
    var db = eventHelper.getCycleDatabase();
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
		
		//Also checking possession number.
		if(!(Number(req.body.possession) > 0)){
			res.render('error', { 
				title: 'Error',
				err: new Error('Possession number is invalid.'),
				data_inputed: true,
				req: req
			});
			return;
		}

		//Building object to save
		var object = {};
		
		object.team = req.body.team;
		object.match = req.body.match;
		object.possession = req.body.possession;
		
		for (var i = 0; i < config.cycle.length; ++i){
			object[config.cycle[i].field] = req.body[config.cycle[i].field];
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
		
		res.render('cycle-entry', { 
			title: 'Match Data Entry', 
			data_recieved: true, 
			cycle: config.cycle,
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

exports.postWithValues = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
    var db = eventHelper.getCycleDatabase();
	var config = eventHelper.getEventConfig();
	var team = req.params.team;
	var match = req.params.match;
	var possession = Number(req.params.possession);

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
		
		//Also checking possession number.
		if(!(Number(req.body.possession) > 0)){
			res.render('error', { 
				title: 'Error',
				err: new Error('Possession number is invalid.'),
				data_inputed: true,
				req: req
			});
			return;
		}

		//Building object to save
		var object = {};
		
		object.team = req.body.team;
		object.match = req.body.match;
		object.possession = req.body.possession;
		
		for (var i = 0; i < config.cycle.length; ++i){
			object[config.cycle[i].field] = req.body[config.cycle[i].field];
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
		possession++;
		res.redirect(/cycle-entry/+team+'/'+match+'/'+possession);
	}catch(err){
		res.render('error', {
			req: req,
			title: 'Error',
			err: err,
			data_inputed: true
		});
	}
};