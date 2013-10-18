
/*
 * GET home page.
 */

exports.team = function(req, res){
	var async = require('async');
	
	var eventHelper = require('./eventHelper');
	var config = eventHelper.getEventConfig();
	var pitdb = eventHelper.getPitDatabase();
	var averagesdb = eventHelper.getAveragesDatabase();
	var stddevsdb = eventHelper.getStdDevDatabase();
	var matchdb = eventHelper.getMatchDatabase();
	var scheduledb = eventHelper.getScheduleDatabase();

	var schedule_data = null;
	var match_data = null;
	var pit_data = null;
		
	var match_averages = [];
	var match_stddevs = [];
	var match_consistency = [];
	var points_average = 0;
	var points_stddev = 0;
	
	async.series([pit(), match(), schedule(), averages(), render()]);
	
	function pit(){
		try{
			pit_data = pitdb.select('team', req.param('number'));
		}catch(err){
			res.render('error', {
				title: 'Error',
				req: req,
				err: err
			});
		}
	}
	
	function match(){
		try{
			match_data = matchdb.select('team', req.param('number'));
		}catch(err){
			res.render('error', {
				req: req,
				title: 'Error',
				err: err
			});
		}
	}
	
	function schedule(){
		try{
			var red1_data = scheduledb.select('red1', req.param('number'));
			var red2_data = scheduledb.select('red2', req.param('number'));
			var red3_data = scheduledb.select('red3', req.param('number'));
			var blue1_data = scheduledb.select('blue1', req.param('number'));
			var blue2_data = scheduledb.select('blue2', req.param('number'));
			var blue3_data = scheduledb.select('blue3', req.param('number'));
			
			schedule_data = red1_data.concat(red2_data, red3_data, blue1_data, blue2_data, blue3_data);
		}catch(err){
			res.render('error', {
				req: req,
				title: 'Error',
				err: err
			});
		}
	}
	
	function averages(){
		try{
			match_averages = averagesdb.select('team', req.param('number'));
			match_stddevs = stddevsdb.select('team', req.param('number'));
			console.log(averagesdb.select('team', req.param('number')));
		}catch(err){
			res.render('error', {
				req: req,
				title: 'Error',
				err: err
			});
		}
	}
	
	function render(){
		try{
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
	
				schedule: schedule_data 
			});
		}catch(err){
			res.render('error', {
				req: req,
				title: 'Error',
				err: err
			});
		}
	}
};

exports.lookup = function(req, res){
	var eventHelper = require('./eventHelper');
	var teams = eventHelper.getEventConfig().teams;
	res.render('team-lookup', {
		req: req,
		title: 'Team Lookup', 
		teams: teams
	});
};