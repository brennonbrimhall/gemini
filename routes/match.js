
/*
 * GET home page.
 */

exports.match = function(req, res){
	var eventHelper = require('./eventHelper');
	var config = eventHelper.getEventConfig();
	var scheduledb = eventHelper.getScheduleDatabase();
	var averagesdb = eventHelper.getAveragesDatabase();
	var pitdb = eventHelper.getPitDatabase();

	try{
		var schedule_data = scheduledb.select('match', req.param('number'));
		
		//Checking for null
		if(schedule_data){
			schedule_data = schedule_data[0];
			var red1 = {number: schedule_data.red1, pit: pitdb.select('team', schedule_data.red1), averages: averagesdb.select('team', schedule_data.red1)[0]};
			var red2 = {number: schedule_data.red2, pit: pitdb.select('team', schedule_data.red2), averages: averagesdb.select('team', schedule_data.red2)[0]};
			var red3 = {number: schedule_data.red3, pit: pitdb.select('team', schedule_data.red3), averages: averagesdb.select('team', schedule_data.red3)[0]};
			var blue1 = {number: schedule_data.blue1, pit: pitdb.select('team', schedule_data.blue1), averages: averagesdb.select('team', schedule_data.blue1)[0]};
			var blue2 = {number: schedule_data.blue2, pit: pitdb.select('team', schedule_data.blue2), averages: averagesdb.select('team', schedule_data.blue2)[0]};
			var blue3 = {number: schedule_data.blue3, pit: pitdb.select('team', schedule_data.blue3), averages: averagesdb.select('team', schedule_data.blue3)[0]};
			
			res.render('match', {title: 'Match '+req.param('number'), number: req.param('number'), red1: red1, red2: red2, red3: red3, blue1: blue1, blue2: blue2, blue3: blue3, pit: config.pit, image: config.image, match: config.match, req:req})
			
		}else{
			throw new Error("The match requested does not exist in the schedule.");
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
	var eventHelper = require('./eventHelper');
	var eventConfig = eventHelper.getEventConfig();
	
	res.render('match-lookup', {
		req: req,
		title: 'Match Lookup', 
		maxMatchNumber: eventConfig.maxMatchNumber
	});
};