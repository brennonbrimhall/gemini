
/**
 * Module dependencies.
 */

//Module variables
var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path');

//Routing variables
var schedule = require('./routes/schedule')
	, pit = require('./routes/pit')
	, image = require('./routes/image')
	, team = require('./routes/team')
	, table = require('./routes/table')
	, match_entry = require('./routes/match-entry')
	, match = require('./routes/match')
	, pull = require('./routes/pull')
	, edit = require("./routes/edit")
	, tba = require("./routes/tba")
	, newEvent = require("./routes/newEvent")
	, configuration = require('./routes/configuration');

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

//Index
app.get('/', routes.index);

//Schedule
app.get('/schedule', schedule.schedule);

//Edit
app.get('/edit', edit.edit);

//Edit schedule
app.get('/edit/schedule/delete/:id', edit.getDeleteSchedule);
app.get('/edit/schedule/add', edit.getAddSchedule);
app.post('/edit/schedule/add', edit.postAddSchedule);
app.get('/edit/schedule/:id', edit.getEditSchedule);
app.post('/edit/schedule/:id', edit.postEditSchedule);

//Edit match entries
app.get('/edit/match-entry/:id', edit.getEditMatchEntry);
app.post('/edit/match-entry/:id', edit.postEditMatchEntry);
app.get('/edit/match-entry/delete/:id', edit.getDeleteMatchEntry);

//Edit pit
app.get('/edit/pit/:id', edit.getEditPit);
app.post('/edit/pit/:id', edit.postEditPit);
app.get('/edit/pit/delete/:id', edit.getDeletePit);

//Image entry
app.get('/image-entry', image.get);
app.post('/image-entry', image.post);

//Pit
app.get('/pit', pit.get);
app.post('/pit', pit.post);

//Match Entry
app.get('/match-entry', match_entry.get);
app.post('/match-entry', match_entry.post);

//Team
app.get('/team/:number', team.team);

//Team Lookup
app.get('/team', team.lookup);

//Match
app.get('/match/:number', match.match);

//Match Lookup
app.get('/match', match.lookup);

//Manage
//app.get('/manage', administration.manage);

//Pull
app.get('/data', pull.data);
app.get('/pull', pull.request);
app.get('/pictures', pull.pictures);
app.post('/pull', pull.request);
app.get('/configure', configuration.getConfiguration);
app.post('/configure', configuration.postConfiguration);
app.get('/data-upload', pull.getUpload);
app.post('/data-upload', pull.postUpload);

//Averages Table
app.get('/table', table.table);

//TBA Proxy
app.get('/tba/event/:key', tba.getEventDetails);

//Event Initialization
app.get('/new-event', newEvent.getInitialize);
app.post('/new-event', newEvent.postInitialize);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
