
/*
 * GET pit data entry form; if there is data, submit.
 */

exports.get = function(req, res){
	var eventHelper = require('./eventHelper');
	var config = eventHelper.getEventConfig();

	res.render('pit', { 
		title: 'Pit Data Entry', 
		data_recieved: false, 
		pit: config.pit,
		teams: config.teams,
		req: req
	});
};

exports.post = function(req, res){
	var eventHelper = require('./eventHelper');
	var db = eventHelper.getPitDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		//Building query string...
		var object = {};
		object.team = req.body.team;
		for(var i = 0; i < config.pit.length; i++){
			object[config.pit[i]['field']] = req.body[config.pit[i].field];
		}
		
		var results = db.select('team', req.body.team);
		
		if(results[0]){
			db.update(object, results[0].id);
		}else{
			db.insert(object);
		}
		
		db.save();
		
		res.render('pit', { 
			title: 'Pit Data Entry', 
			data_recieved: false, 
			pit: config.pit,
			teams: config.teams,
			req: req
		});
	}catch(err){
		res.render('error', {err: err, req: req});
	}
};