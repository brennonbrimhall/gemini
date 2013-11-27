
/*
 * GET nice big table.
 */

exports.table = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();
	var db = eventHelper.getAveragesDatabase();
	
	try{
		var averages_data = db.selectAll();
		console.log(averages_data);
		res.render('table', 
			{
				title: 'Averages Table',
				averages_data : averages_data,
				match: config.match,
				req: req
			}
		);
	}catch(err){
		res.render('error', {
			req: req,
            err: err,
            title: 'Error'
        });
	}
};