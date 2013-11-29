
/*
 * GET home page.
 */

exports.match = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var plugins = require('../helpers/process-plugin');
	var config = eventHelper.getEventConfig();
	var matchdb = eventHelper.getMatchDatabase();
	var scheduledb = eventHelper.getScheduleDatabase();
	var averagesdb = eventHelper.getAveragesDatabase();
	var pitdb = eventHelper.getPitDatabase();

	try{
		var schedule_data = scheduledb.select('match', req.param('number'));
		
		//Checking for null
		if(schedule_data){
			schedule_data = schedule_data[0];
			
			//Processing plugins
			var red1plugins = {};
			if(config.match.plugins){
				for(var i = 0; i < config.match.plugins.length; i++){
					if(matchdb.select('team', schedule_data.red1).length !== 0){
						red1plugins[config.match.plugins[i].name] = plugins.process(config.match.plugins[i].plugin, matchdb.select('team', schedule_data.red1));
					}else{
						red1plugins[config.match.plugins[i].name] = null;
					}
				}
				var red2plugins = {};
				for(var i = 0; i < config.match.plugins.length; i++){
					if(matchdb.select('team', schedule_data.red2).length !== 0){
						red2plugins[config.match.plugins[i].name] = plugins.process(config.match.plugins[i].plugin, matchdb.select('team', schedule_data.red2));
					}else{
						red2plugins[config.match.plugins[i].name] = null;
					}
				}
				var red3plugins = {};
				for(var i = 0; i < config.match.plugins.length; i++){
					if(matchdb.select('team', schedule_data.red3).length !== 0){
						red3plugins[config.match.plugins[i].name] = plugins.process(config.match.plugins[i].plugin, matchdb.select('team', schedule_data.red3));
					}else{
						red3plugins[config.match.plugins[i].name] = null;
					}
				}
				var blue1plugins = {};
				for(var i = 0; i < config.match.plugins.length; i++){
					if(matchdb.select('team', schedule_data.blue1).length !== 0){
						blue1plugins[config.match.plugins[i].name] = plugins.process(config.match.plugins[i].plugin, matchdb.select('team', schedule_data.blue1));
					}else{
						blue1plugins[config.match.plugins[i].name] = null;
					}
				}
				var blue2plugins = {};
				for(var i = 0; i < config.match.plugins.length; i++){
					if(matchdb.select('team', schedule_data.blue2).length !== 0){
						blue2plugins[config.match.plugins[i].name] = plugins.process(config.match.plugins[i].plugin, matchdb.select('team', schedule_data.blue2));
					}else{
						blue2plugins[config.match.plugins[i].name] = null;
					}
				}
				var blue3plugins = {};
				for(var i = 0; i < config.match.plugins.length; i++){
					if(matchdb.select('team', schedule_data.blue3).length !== 0){
						blue3plugins[config.match.plugins[i].name] = plugins.process(config.match.plugins[i].plugin, matchdb.select('team', schedule_data.blue3));
					}else{
						blue3plugins[config.match.plugins[i].name] = null;
					}
				}
			}
			
			var red1 = {number: schedule_data.red1, pit: pitdb.select('team', schedule_data.red1), averages: averagesdb.select('team', schedule_data.red1)[0], plugins: red1plugins};
			var red2 = {number: schedule_data.red2, pit: pitdb.select('team', schedule_data.red2), averages: averagesdb.select('team', schedule_data.red2)[0], plugins: red2plugins};
			var red3 = {number: schedule_data.red3, pit: pitdb.select('team', schedule_data.red3), averages: averagesdb.select('team', schedule_data.red3)[0], plugins: red3plugins};
			var blue1 = {number: schedule_data.blue1, pit: pitdb.select('team', schedule_data.blue1), averages: averagesdb.select('team', schedule_data.blue1)[0], plugins: blue1plugins};
			var blue2 = {number: schedule_data.blue2, pit: pitdb.select('team', schedule_data.blue2), averages: averagesdb.select('team', schedule_data.blue2)[0], plugins: blue2plugins};
			var blue3 = {number: schedule_data.blue3, pit: pitdb.select('team', schedule_data.blue3), averages: averagesdb.select('team', schedule_data.blue3)[0], plugins: blue3plugins};
			
			res.render('match', {title: 'Match '+req.param('number'), number: req.param('number'), red1: red1, red2: red2, red3: red3, blue1: blue1, blue2: blue2, blue3: blue3, pit: config.pit, image: config.image, match: config.match, req:req})
			
		}else{
			throw new Error('The match requested does not exist in the schedule.');
		}
		
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
	
};

exports.lookup = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var eventConfig = eventHelper.getEventConfig();
	
	res.render('match-lookup', {
		req: req,
		title: 'Match Lookup', 
		maxMatchNumber: eventConfig.maxMatchNumber
	});
};