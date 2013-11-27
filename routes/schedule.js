
/*
 * GET match schedule data.
 */

exports.schedule = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var db = eventHelper.getScheduleDatabase();
	
	try{
		var result = db.selectAll();
		res.render('schedule', {req: req, schedule: result, title: 'Schedule'});
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};