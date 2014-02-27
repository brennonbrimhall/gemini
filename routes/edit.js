exports.edit = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var scheduledb = eventHelper.getScheduleDatabase();
	var autodb = eventHelper.getAutoDatabase();
	var cycledb = eventHelper.getCycleDatabase();
	var pitdb = eventHelper.getPitDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		var scheduleData = scheduledb.selectAll();
		var autoData = autodb.selectAll();
		var cycleData = cycledb.selectAll();
		var pitData = pitdb.selectAll();
		
		res.render('edit', {
			req: req, 
			scheduleData: scheduleData, 
			auto: config.auto,
			autoData: autoData,
			cycle: config.cycle,
			cycleData: cycleData,
			pit: config.pit, 
			pitData: pitData, 
			title: 'Edit Database'
		});
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

exports.getEditAutoEntry = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getAutoDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		var result = db.select('id', req.param('id'));
		res.render('auto-entry-edit', {req: req, autoData: result[0], teams: config.teams, auto: config.auto, maxMatchNumber: config.maxMatchNumber, title: 'Edit Auto Entry'});
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.postEditAutoEntry = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getAutoDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		//Building object to save
		var object = {};
		
		object.team = req.body.team;
		object.match = req.body.match;
		
		for (var i = 0; i < config.auto.length; ++i){
			object[config.auto[i].field] = req.body[config.auto[i].field];
		}
	
		db.update(object, req.param('id'));
		db.save();
		
		res.redirect('/edit#auto');
	
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getDeleteAutoEntry = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getAutoDatabase();
	
	try{
		db.delete(req.param('id'));
		db.save();
		res.redirect('/edit#auto');
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getEditCycleEntry = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getCycleDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		var result = db.select('id', req.param('id'));
		res.render('cycle-entry-edit', {req: req, cycleData: result[0], teams: config.teams, cycle: config.cycle, maxMatchNumber: config.maxMatchNumber, title: 'Edit Cycle Entry'});
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.postEditCycleEntry = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getCycleDatabase();
	var config = eventHelper.getEventConfig();
	
	try{
		//Building object to save
		var object = {};
		
		object.team = req.body.team;
		object.match = req.body.match;
		object.possession = req.body.possession;
		
		for (var i = 0; i < config.cycle.length; ++i){
			object[config.cycle[i].field] = req.body[config.cycle[i].field];
		}
	
		db.update(object, req.param('id'));
		db.save();
		
		res.redirect('/edit#cycle');
	
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};

exports.getDeleteCycleEntry = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getCycleDatabase();
	
	try{
		db.delete(req.param('id'));
		db.save();
		res.redirect('/edit#cycle');
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