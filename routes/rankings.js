
/*
 * GET rankings data.
 */

exports.rankings = function(req, res){
	var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('database.db');
	var config = require('../config');
    
    db.on('error', function(err){
		console.log(err);
		res.render('error', {
			err: err
		});
	});
	
	db.serialize(function(){
	   db.all("SELECT * FROM `rankings` ORDER BY `rank`;", function(err, rows){
            if(err){
                console.log(err);
                res.render('error', {
                    err: err
                });
            }else{
                res.render('rankings', {title:'Rankings', rankings: rows, rankings_config: config.rankings});    
            }
        }); 
	});
	
	db.close();
};