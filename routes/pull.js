
/*
 * GET database from this server.
 */

exports.data = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = require('../config.json');

	//Checking to see if we have allowed others to pull
	if(config.pull.allowDataDownload) {
		try {
			var data = {};
			data.config = eventHelper.getEventConfig();
			data.auto = eventHelper.getAutoData();
			data.cycle = eventHelper.getCycleData();
			data.pit = eventHelper.getPitData();
			data.schedule = eventHelper.getScheduleData();
			res.set('Content-Type', 'application/json');
			res.set('Content-Disposition', 'attachment; filename=\"'+config.currentEvent+'-data-'+(new Date()).toUTCString()+'.json\"');
			res.send(data);
		}catch(err){
			res.render('error', {
				req: req,
				title: 'Error',
				err: err
			});
		}

	//If we're not willing to send our data, configuration, and other stuff over (since this is potentially compromising), we state a 403 error.
	}else{
		res.status(403);
		res.send();
	}
	
};

/*
 * GET render upload data extract form.
 */

exports.getUpload = function(req, res){
	var config = require('../config');

	//Checking to see if we have allowed others to pull
	if(config.pull.allowSelfToPullData) {
		res.render('uploadData', { 
			title: 'Upload Data',
			req: req
		});

	//If we're not willing to send our database over (since this is potentially compromising), we state a 403 error.
	}else{
		res.status(403);
		res.send();
	}
	
};

/*
 * POST upload data extract to server
 */

exports.postUpload = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var fs = require('fs');
	
	if(req.ip === '127.0.0.1'){
		try{
			//Validating file; don't want to corrupt anything.
			if(req.files.data.type !== 'application/octet-stream'){
				throw new Error('The type of document you uploaded doesn\'t have a MIME type of application/json.');
			}else{
				var data = JSON.parse(fs.readFileSync(req.files.data.path));
				if(typeof data.config === 'undefined'){
					throw new Error('Data uploaded is invalid; it doesn\'t have a proper config attribute.');
				}
				if(typeof data.auto === 'undefined'){
					throw new Error('Data uploaded is invalid; it doesn\'t have a proper auto attribute.');
				}
				if(typeof data.cycle === 'undefined'){
					throw new Error('Data uploaded is invalid; it doesn\'t have a proper cycle attribute.');
				}
				if(typeof data.pit === 'undefined'){
					throw new Error('Data uploaded is invalid; it doesn\'t have a proper pit attribute.');
				}
				if(typeof data.schedule === 'undefined'){
					throw new Error('Data uploaded is invalid; it doesn\'t have a proper schedule attribute.');
				}
				fs.writeFileSync(eventHelper.getCurrentEvent()+'.json', JSON.stringify(data.config));
				fs.writeFileSync(eventHelper.getCurrentEvent()+'.auto', JSON.stringify(data.auto));
				fs.writeFileSync(eventHelper.getCurrentEvent()+'.cycle', JSON.stringify(data.cycle));
				fs.writeFileSync(eventHelper.getCurrentEvent()+'.pit', JSON.stringify(data.pit));
				fs.writeFileSync(eventHelper.getCurrentEvent()+'.schedule', JSON.stringify(data.schedule));
				res.redirect('/');
			}
		}catch(err){
			res.render('error', {
				req: req,
				title: 'Error',
				err: err
			});
		}
	}else{
		res.send(403);
	}
};