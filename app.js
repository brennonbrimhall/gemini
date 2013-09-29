
/**
 * Module dependencies.
 */

//Module variables
var express = require('express')
	, routes = require('./routes')
	, mysql = require('mysql')
	, http = require('http')
	, path = require('path');

//Routing variables
var schedule = require('./routes/schedule')
	, rankings = require('./routes/rankings')
	, pit = require('./routes/pit')
	, team = require('./routes/team')
	, table = require('./routes/table')
	, match_entry = require('./routes/match-entry')
	, match = require('./routes/match')
	, pull = require('./routes/pull')
	, administration = require('./routes/administration');

//Configuration variable
var config = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/schedule', schedule.schedule);
app.get('/rankings', rankings.rankings);
app.get('/pit', pit.get);
app.post('/pit', pit.post);
app.get('/match-entry', match_entry.get);
app.post('/match-entry', match_entry.post);
app.get('/team/:number', team.team);
app.get('/team', team.lookup);
app.get('/match/:number', match.match);
app.get('/match', match.lookup);
app.get('/manage', administration.manage);
app.get('/data', pull.data);
app.get('/pull', pull.request);
app.get('/pictures', pull.pictures);
app.post('/pull', pull.request);
app.get('/config', pull.config);
app.get('/table', table.table);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
