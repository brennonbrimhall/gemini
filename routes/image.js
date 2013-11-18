
/*
 * GET pit data entry form; if there is data, submit.
 */

exports.get = function(req, res){
	var eventHelper = require('./eventHelper');
	var config = eventHelper.getEventConfig();
	
	try{
		res.render('image', { 
			title: 'Upload Image', 
			data_recieved: false, 
			image: config.image,
			teams: config.teams,
			req: req
		});
	}catch(err){
		res.render('error', {err: err, req: req, title: 'Error'});	
	}
};

exports.post = function(req, res){
	var eventHelper = require('./eventHelper');
	var config = eventHelper.getEventConfig();
	var fs = require('fs');
	
	try{
		//Currently only accepts JPG images
		if(req.files.image.type !== 'image/jpeg'){
			throw new Error('Only JPEG images are uploadable.  Sorry!');
		}else{
			var suffix = null;
			for(var i =0; i<config.image.length; i++){
				if(config.image[i].name == req.body.type){
					suffix = config.image[i].suffix;
				}
			}
			fs.readFile(req.files.image.path, function (err, data) {
				if(suffix === null){
					suffix = "";
				}
				var newPath = "./public/pictures/"+req.body.team+suffix+'.JPG';
				fs.writeFile(newPath, data, function (err) {
					if(err){
						res.render('error', {err: err, req: req, title: 'Error'});
					}else{
						res.render('image', { 
							title: 'Upload Image', 
							data_recieved: false, 
							image: config.image,
							teams: config.teams,
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