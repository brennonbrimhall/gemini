
/*
 * GET nice big table.
 */

exports.table = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();
	var overviewHelper = require('../helpers/teamOverviewHelper');
	
	var summaryData = {};
	
	try{
		for(var i = 0; i < config.teams.length; i++){
			summaryData[config.teams[i].toString()] = overviewHelper.tableCaclulateForTeam(config.teams[i]);
		}
		res.render('table', 
			{
				title: 'Summary Table',
				teams : config.teams,
				overview: overviewHelper.getTableOverview(),
				summaryData: summaryData,
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