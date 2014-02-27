
/*
 * GET home page.
 */

exports.match = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var overviewHelper = require('../helpers/teamOverviewHelper');
	var config = eventHelper.getEventConfig();
	var autodb = eventHelper.getAutoDatabase();
	var cycledb = eventHelper.getCycleDatabase();
	var scheduledb = eventHelper.getScheduleDatabase();
	var pitdb = eventHelper.getPitDatabase();

	try{
		var scheduleData = scheduledb.select('match', req.param('number'));
		
		//Checking for null
		if(scheduleData && scheduleData[0]){
			scheduleData = scheduleData[0];
			
			var red1 = {number: scheduleData.red1, pit: pitdb.select('team', scheduleData.red1), overview: overviewHelper.getOverview(), overviewData: overviewHelper.calculate(autodb.select('team', scheduleData.red1))};
			var red2 = {number: scheduleData.red2, pit: pitdb.select('team', scheduleData.red2), overview: overviewHelper.getOverview(), overviewData: overviewHelper.calculate(autodb.select('team', scheduleData.red2))};
			var red3 = {number: scheduleData.red3, pit: pitdb.select('team', scheduleData.red3), overview: overviewHelper.getOverview(), overviewData: overviewHelper.calculate(autodb.select('team', scheduleData.red3))};
			var blue1 = {number: scheduleData.blue1, pit: pitdb.select('team', scheduleData.blue1), overview: overviewHelper.getOverview(), overviewData: overviewHelper.calculate(autodb.select('team', scheduleData.blue1))};
			var blue2 = {number: scheduleData.blue2, pit: pitdb.select('team', scheduleData.blue2), overview: overviewHelper.getOverview(), overviewData: overviewHelper.calculate(autodb.select('team', scheduleData.blue2))};
			var blue3 = {number: scheduleData.blue3, pit: pitdb.select('team', scheduleData.blue3), overview: overviewHelper.getOverview(), overviewData: overviewHelper.calculate(autodb.select('team', scheduleData.blue3))};
			
			res.render('match', {
				title: 'Match '+req.param('number'), 
				number: req.param('number'), 
				red1: red1, 
				red2: red2, 
				red3: red3, 
				blue1: blue1, 
				blue2: blue2, 
				blue3: blue3, 
				pit: config.pit, 
				image: config.image,
				match: config.match, 
				req:req
			});
			
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