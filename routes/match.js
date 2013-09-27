
/*
 * GET home page.
 */

exports.match = function(req, res){
	var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('database.db');
	var config = require('../config');

	db.on('error', function(err){
		res.render('error', {
			err: err
		});
	});

	var pit_data = new Array();
	var schedule_data = new Array();
	var match_data = new Array();

	//Grabbing schedule info for this match
	db.serialize(function(){
        db.all("SELECT * FROM `schedule` WHERE `match` = ?;", req.param('number'), function(err, rows){
            if(err){
                console.log(err);
                res.render('error', {
                    err: err
                });
            }else{
                schedule_data = rows;
                
                db.serialize(function(){
                    db.all("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['red1']+" ORDER BY `match`;", function(err, rows){
                        if(err) {
                            res.render('error', {
                                err: err
                            });
                        }else{
                        	match_data['red1'] = rows;	
                        }
                    });
                    
					db.all("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['red2']+" ORDER BY `match`;", function(err, rows){
						if(err) {
							res.render('error', {
								err: err
							});
						}else{
							match_data['red2'] = rows;
						}
					});
					
					db.all("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['red3']+" ORDER BY `match`;", 
						function(err, results){
							if(err) {
								res.render('error', {
									err: err
								});
							}
							match_data['red3'] = results;
						}
					);
					
					db.all("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['blue1']+" ORDER BY `match`;", 
						function(err, results){
							if(err) {
								res.render('error', {
									err: err
								});
							}
							match_data['blue1'] = results;
						}
					);
					
					db.all("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['blue2']+" ORDER BY `match`;", 
						function(err, results){
							if(err) {
								res.render('error', {
									err: err
								});
							}
							match_data['blue2'] = results;
						}
					);
					
					db.all("SELECT * FROM `match` WHERE `team` ="+schedule_data[0]['blue3']+" ORDER BY `match`;", 
						function(err, results){
							if(err) {
								res.render('error', {
									err: err
								});
							}
							match_data['blue3'] = results;
						}
					);
					
					db.all("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['red1']+";", 
						function(err, results) {
							console.log("Got pit data")
							if (err) {
								res.render('error', {
									err: err
								});
							}
							pit_data['red1'] = results[0];
						}
					);
					
					db.all("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['red2']+";", 
						function(err, results) {
							console.log("Got pit data")
							if (err) {
								res.render('error', {
									err: err
								});
							}
							pit_data['red2'] = results[0];
						}
					);
					
					db.all("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['red3']+";", 
						function(err, results) {
							console.log("Got pit data")
							if (err) {
								res.render('error', {
									err: err
								});
							}
							pit_data['red3'] = results[0];
						}
					);
					
					db.all("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['blue1']+";", 
						function(err, results) {
							console.log("Got pit data")
							if (err) {
								res.render('error', {
									err: err
								});
							}
							pit_data['blue1'] = results[0];
						}
					);
					
					db.all("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['blue2']+";", 
						function(err, results) {
							console.log("Got pit data")
							if (err) {
								res.render('error', {
									err: err
								});
							}
							pit_data['blue2'] = results[0];
						}
					);
					
					db.all("SELECT * FROM `pit` WHERE `team` = "+schedule_data[0]['blue3']+";", 
						function(err, results) {
							console.log("Got pit data")
							if (err) {
								res.render('error', {
									err: err
								});
							}
							pit_data['blue3'] = results[0];
							
							res.render('match', {
									title: 'Match '+req.param('number'), 
									number: req.param('number'), 
									image: config.image,
									pit: config.pit,
									pit_data: pit_data,
									match_data: match_data,
									match: config.match,
									schedule: schedule_data 
								}
							);
						}
					);
                });
            }
        });
	});
};

exports.lookup = function(req, res){
	var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('database.db');
	var config = require('../config');
	console.log("database: "+config.mysql.database);
	
	db.on('error', function(err){
		res.render('error', {
			err: err
		});
	});
	
	db.all("SELECT DISTINCT(`match`) FROM `schedule`;", function(err, results) {
		if (err) {
			console.log(err);
			res.render('error', { 
				title: 'Match Lookup', 
				data_inputed: false, 
				err: err
			});
		}else{
			console.log(JSON.stringify(results));
			res.render('match-lookup', {
				title: 'Match Lookup', 
				matches: results
			});
		}
	});
};