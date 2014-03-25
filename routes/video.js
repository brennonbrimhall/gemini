
/*
 * GET pit data entry form; if there is data, submit.
 */

exports.get = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();
	
	try{
		res.render('video', { 
			title: 'Upload Video', 
			data_recieved: false, 
			maxMatchNumber : config.maxMatchNumber,
			req: req
		});
	}catch(err){
		res.render('error', {err: err, req: req, title: 'Error'});	
	}
};

exports.post = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getEventConfig();
	var fs = require('fs');
	
	try{
		//Currently only accepts MP4 Video
		if(req.files.video.type !== 'video/mp4'){
			throw new Error('Only MP4 videos are supported.  Sorry!');
		}else{
			fs.readFile(req.files.video.path, function (err, data) {
				var newPath = './public/videos/'+req.body.match+'.mp4';
				fs.writeFile(newPath, data, function (err) {
					if(err){
						res.render('error', {err: err, req: req, title: 'Error'});
					}else{
						res.render('video', { 
							title: 'Upload Video', 
							data_recieved: false, 
							maxMatchNumber: config.maxMatchNumber,
							req: req
						});
					}
				});
			});
		}
	}catch(err){
		res.render('error', { 
			title: 'Error',
			req: req
		});
	}
};