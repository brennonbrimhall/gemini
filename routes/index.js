
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Gemini Scouting System', req:req });
};