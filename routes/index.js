
/*
 * GET home page.
 */

exports.index = function(req, res){
	var config = require('../config');
	
	res.render('index', { title: 'Gemini Scouting System', req:req, config:config });
};