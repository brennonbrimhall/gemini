
/*
 * GET match data entry form; if there is data, submit.
 */

exports.get = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();

	res.render('auto-entry', { 
		title: 'Auto Data Entry', 
		data_recieved: false, 
		auto: config.auto,
		teams: config.teams,
		maxMatchNumber: config.maxMatchNumber,
		req: req
	});
};

exports.post = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
    var db = eventHelper.getAutoDatabase();
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
		
		for (var i = 0; i < config.auto.length; ++i){
			object[config.auto[i].field] = req.body[config.auto[i].field];
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

		//Redirecting to the cycle entry page (easier on data input people)
		res.redirect('/cycle-entry/'+req.body.team+'/'+req.body.match+'/1');
	}catch(err){
		res.render('error', {
			req: req,
			title: 'Error',
			err: err,
			data_inputed: true
		});
	}
};