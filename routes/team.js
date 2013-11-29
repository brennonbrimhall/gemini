
/*
 * GET home page.
 */

exports.team = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();
	var pitdb = eventHelper.getPitDatabase();
	var averagesdb = eventHelper.getAveragesDatabase();
	var stddevsdb = eventHelper.getStdDevDatabase();
	var matchdb = eventHelper.getMatchDatabase();
	var scheduledb = eventHelper.getScheduleDatabase();
	
	var plugins = require('../helpers/process-plugin');
	
	var schedule_data = {};
	var match_data = {};
	var pit_data = {};
	var plugins_data = {};
		
	var match_averages = [];
	var match_stddevs = [];
	var points_average = 0;
	var points_stddev = 0;
	
	try{
		pit_data = pitdb.select('team', req.param('number'));

		match_data = matchdb.select('team', req.param('number'));
		
		var red1_data = scheduledb.select('red1', req.param('number'));
		var red2_data = scheduledb.select('red2', req.param('number'));
		var red3_data = scheduledb.select('red3', req.param('number'));
		var blue1_data = scheduledb.select('blue1', req.param('number'));
		var blue2_data = scheduledb.select('blue2', req.param('number'));
		var blue3_data = scheduledb.select('blue3', req.param('number'));
		
		schedule_data = red1_data.concat(red2_data, red3_data, blue1_data, blue2_data, blue3_data);

		match_averages = averagesdb.select('team', req.param('number'));
		match_stddevs = stddevsdb.select('team', req.param('number'));
		
		if(config.match.plugins){
			for(var i = 0; i < config.match.plugins.length; i++){
				plugins_data[config.match.plugins[i].name] = plugins.process(config.match.plugins[i].plugin, match_data);
			}
		}

		console.log(plugins_data);

		res.render('team', {
			req: req,
			title: 'Team '+req.param('number'), 
			number: req.param('number'), 

			image: config.image,

			pit: config.pit,
			pit_data: pit_data,

			match_data: match_data,
			match: config.match,
			match_averages: match_averages,
			match_stddevs: match_stddevs,

			points_average: points_average,
			points_stddev: points_stddev,

			schedule: schedule_data,
			plugins: plugins_data
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