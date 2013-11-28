
/*
 * GET database from this server.
 */

exports.getInitialize = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getSystemConfig();
	
	res.render('newEvent', { title: 'Initialize New Event', req: req, config: config});
	
};

/*
 * POST upload data extract to server
 */

exports.postInitialize = function(req, res){
	var eventHelper = require('../helpers/eventHelper');
	var config = eventHelper.getSystemConfig();
	var fs = require('fs');
	var JSONDB = require('brennonbrimhall-jsondb');
	
	try{
		//Validating file; don't want to corrupt anything.
		//Checking MIME type
		if(req.files.data.type !== 'application/octet-stream'){
			throw new Error('The type of document you uploaded doesn\'t have a MIME type of application/json.');
		}
		//Evaluating and Parsing
		var data = JSON.parse(fs.readFileSync(req.files.data.path));
		var code = req.body.code;
		
		//Validating attributes
		//Validating team list
		if(!(data.teams instanceof Array)){
			throw new Error('Data uploaded is invalid; it doesn\'t have a proper teams attribute.');
		}
		
		//Iterating over team numbers
		for(var i = 0; i < data.teams.length; i++){
			if(typeof data.teams[i] !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper teams attribute.  Check the team at index '+i+'.');	
			}
		}
		
		//Validating maxMatchNumber
		if(typeof data.maxMatchNumber !== 'number'){
			throw new Error('Data uploaded is invalid; it doesn\'t have a proper maxMatchNumber attribute.');
		}
		
		//Validating image
		if(!(data.image instanceof Array)){
			throw new Error('Data uploaded is invalid; it doesn\'t have a proper image attribute.');
		}
		
		//Iterating over images
		for(var i = 0; i < data.image.length; i++){
			if(typeof data.image[i].name !== 'string'){
				throw new Error ('Data uploaded is invalid; it doesn\'t have a proper image attribute.  Check index '+i+'.');
			}
			if(typeof data.image[i].suffix !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper image attribute.  Check index '+i+'.');
			}
		}
		
		//Checking pit config
		if(!(data.pit instanceof Array)){
			throw new Error('Data uploaded is invalid; it doesn\'t have a proper pit attribute.');
		}
		
		//Iterating over pit config
		for(var i = 0; i < data.pit.length; i++){
			if(typeof data.pit[i].name !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper pit attribute.  Check index '+i+'.');
			}
			if(typeof data.pit[i].field !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper pit attribute.  Check index '+i+'.');
			}
		}
		
		//Checking match config and collecting fields
		
		var fields = [];
		
		//Checking match auto config
		if(!(data.match.auto instanceof Array)){
			throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.auto attribute.');
		}
		
		//Auto
		for(var i=0; i<data.match.auto.length; i++){
			//Name field
			if(typeof data.match.auto[i].name !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.auto attribute.  Check index '+i+'.');
			}
			
			//Field field
			if(typeof data.match.auto[i].field !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.auto attribute.  Check index '+i+'.');
			}
			fields.push(data.match.auto[i].field);
			
			//Points field
			if(typeof data.match.auto[i].points !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.auto attribute.  Check index '+i+'.');
			}
			
			//Max field
			if(typeof data.match.auto[i].max !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.auto attribute.  Check index '+i+'.');
			}
			
			//Min field
			if(typeof data.match.auto[i].min !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.auto attribute.  Check index '+i+'.');
			}
			
			//Average field
			if(typeof data.match.auto[i].average !== 'boolean'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.auto attribute.  Check index '+i+'.');
			}
			
			//StdDev field
			if(typeof data.match.auto[i].stddev !== 'boolean'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.auto attribute.  Check index '+i+'.');
			}
		}
		
		//Teleop
		for(var i=0; i<data.match.teleop.length; i++){
			//Name field
			if(typeof data.match.teleop[i].name !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.teleop attribute.  Check index '+i+'.');
			}
			
			//Field field
			if(typeof data.match.teleop[i].field !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.teleop attribute.  Check index '+i+'.');
			}
			fields.push(data.match.teleop[i].field);
			
			//Points field
			if(typeof data.match.teleop[i].points !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.teleop attribute.  Check index '+i+'.');
			}
			
			//Max field
			if(typeof data.match.teleop[i].max !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.teleop attribute.  Check index '+i+'.');
			}
			
			//Min field
			if(typeof data.match.teleop[i].min !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.teleop attribute.  Check index '+i+'.');
			}
			
			//Average field
			if(typeof data.match.teleop[i].average !== 'boolean'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.teleop attribute.  Check index '+i+'.');
			}
			
			//StdDev field
			if(typeof data.match.teleop[i].stddev !== 'boolean'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.teleop attribute.  Check index '+i+'.');
			}
		}
		
		//Endgame
		for(var i=0; i<data.match.endgame.length; i++){
			//Name field
			if(typeof data.match.endgame[i].name !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.endgame attribute.  Check index '+i+'.');
			}
			
			//Field field
			if(typeof data.match.endgame[i].field !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.endgame attribute.  Check index '+i+'.');
			}
			fields.push(data.match.endgame[i].field);
			
			//Points field
			if(typeof data.match.endgame[i].points !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.endgame attribute.  Check index '+i+'.');
			}
			
			//Max field
			if(typeof data.match.endgame[i].max !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.endgame attribute.  Check index '+i+'.');
			}
			
			//Min field
			if(typeof data.match.endgame[i].min !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.endgame attribute.  Check index '+i+'.');
			}
			
			//Average field
			if(typeof data.match.endgame[i].average !== 'boolean'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.endgame attribute.  Check index '+i+'.');
			}
			
			//StdDev field
			if(typeof data.match.endgame[i].stddev !== 'boolean'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.endgame attribute.  Check index '+i+'.');
			}
		}
		
		//Other
		for(var i=0; i<data.match.other.length; i++){
			//Name field
			if(typeof data.match.other[i].name !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.other attribute.  Check index '+i+'.');
			}
			
			//Field field
			if(typeof data.match.other[i].field !== 'string'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.other attribute.  Check index '+i+'.');
			}
			
			fields.push(data.match.other[i].field);
			
			//Points field
			if(typeof data.match.other[i].points !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.other attribute.  Check index '+i+'.');
			}
			
			//Max field
			if(typeof data.match.other[i].max !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.other attribute.  Check index '+i+'.');
			}
			
			//Min field
			if(typeof data.match.other[i].min !== 'number'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.other attribute.  Check index '+i+'.');
			}
			
			//Average field
			if(typeof data.match.other[i].average !== 'boolean'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.other attribute.  Check index '+i+'.');
			}
			
			//StdDev field
			if(typeof data.match.other[i].stddev !== 'boolean'){
				throw new Error('Data uploaded is invalid; it doesn\'t have a proper match.other attribute.  Check index '+i+'.');
			}
		}
		
		if(typeof code !== 'string'){
			throw new Error('The event code you submitted is invalid.');
		}
		
		for(var i = 0; i< config.events.length; i++){
			if(code === config.events[i]){
				throw new Error('The event code you submitted is already in use.');
			}
		}
		config.events.push(code);
		config.currentEvent = code;
		eventHelper.saveSystemConfig(config);
		fs.writeFileSync('./data/'+code+'.json', JSON.stringify(data));
		(new JSONDB('./data/'+code+'.averages', fields)).save();
		(new JSONDB('./data/'+code+'.match', fields)).save();
		(new JSONDB('./data/'+code+'.pit', fields)).save();
		(new JSONDB('./data/'+code+'.schedule', ['match','red1','red2','red3','blue1','blue2','blue3','redScore','blueScore'])).save();
		(new JSONDB('./data/'+code+'.stddevs', fields)).save();
		
		res.redirect('/');
	}catch(err){
		res.render('error', {
			req: req,
			title: 'Error',
			err: err
		});
	}
};