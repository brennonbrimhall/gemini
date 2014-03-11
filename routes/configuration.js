
/*
 * GET administration data.
 */

exports.getConfiguration = function(req, res){
	var packageData = require('../package');
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getSystemConfig();
	
	res.render('configuration', { title: 'Configuration', req: req, config: config, packageData: packageData});
};


/*
 * POST administration data.
 */

exports.postConfiguration = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getSystemConfig();
	var fs = require('fs');
	
	try{
		if(Number(req.body.othersPull) == 1){
			config.pull.allowOthersToPullData = true;
		}else{
			config.pull.allowOthersToPullData = false;
		}
		
		if(Number(req.body.selfPull) == 1){
			config.pull.allowSelfToPullData = true;
		}else{
			config.pull.allowSelfToPullData = false;
		}
		
		if(Number(req.body.editData) == 1){
			config.editData = true;
		}else{
			config.editData = false;
		}
		
		config.currentEvent = req.body.event;
		fs.writeFileSync('config.json', JSON.stringify(config));
		
		res.redirect('/');
		
	}catch(err){
		res.render('error', {
			req: req,
			title: 'Error',
			err: err
		});
	}
};