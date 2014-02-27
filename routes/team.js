
/*
 * GET home page.
 */

exports.team = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();
	var pitdb = eventHelper.getPitDatabase();
	var cycledb = eventHelper.getCycleDatabase();
	var autodb = eventHelper.getAutoDatabase();
	var scheduledb = eventHelper.getScheduleDatabase();
	var overviewHelper = require('../helpers/teamOverviewHelper');
	
	var plugins = require('../helpers/process-plugin');
	
	var scheduleData = {};
	var autoData = {};
	var cycleData = {};
	var pitData = {};
	var overviewData = {};
	var pluginsData = {};

	
	try{
		pitData = pitdb.select('team', req.param('number'));
		autoData = autodb.select('team', req.param('number'));
		cycleData = cycledb.select('team', req.param('number'));
		
		var red1_data = scheduledb.select('red1', req.param('number'));
		var red2_data = scheduledb.select('red2', req.param('number'));
		var red3_data = scheduledb.select('red3', req.param('number'));
		var blue1_data = scheduledb.select('blue1', req.param('number'));
		var blue2_data = scheduledb.select('blue2', req.param('number'));
		var blue3_data = scheduledb.select('blue3', req.param('number'));
		
		scheduleData = red1_data.concat(red2_data, red3_data, blue1_data, blue2_data, blue3_data);
		
		overviewData = overviewHelper.calculate(autoData, cycleData);
		
		if(config.plugins){
			for(var i = 0; i < config.plugins.length; i++){
				pluginsData[config.plugins[i].name] = plugins.process(config.plugins[i].plugin, {auto: autoData, cycle: cycleData});
			}
		}

		res.render('team', {
			req: req,
			title: 'Team '+req.param('number'), 
			number: req.param('number'), 

			image: config.image,

			pit: config.pit,
			pitData: pitData,

			auto: config.auto,
			autoData: autoData,
			cycle: config.cycle,
			cycleData: cycleData,

			schedule: scheduleData,
			
			overview: overviewHelper.getOverview(),
			overviewData: overviewData,
			
			plugins: config.plugins,
			pluginsData: pluginsData
		});
	}catch(err){
		res.render('error', {
			req: req,
			title: 'Error',
			err: err
		});
	}
};


exports.lookup = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var teams = eventHelper.getEventConfig().teams;
	res.render('team-lookup', {
		req: req,
		title: 'Team Lookup', 
		teams: teams
	});
};