
/**
 * Module dependencies.
 */

//Module variables
var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path');

//Routing variables
var schedule = require('./routes/schedule'),
	pit = require('./routes/pit'),
	image = require('./routes/image'),
	video = require('./routes/video'),
	team = require('./routes/team'),
	table = require('./routes/table'),
	autoEntry = require('./routes/auto-entry'),
	cycleEntry = require('./routes/cycle-entry'),
	match = require('./routes/match'),
	//tba = require('./routes/tba'),
	pull = require('./routes/pull'),
	edit = require("./routes/edit"),
	newEvent = require("./routes/newEvent"),
	configuration = require('./routes/configuration');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 3600 }));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

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

//Edit auto entries
app.get('/edit/auto-entry/:id', edit.getEditAutoEntry);
app.post('/edit/auto-entry/:id', edit.postEditAutoEntry);
app.get('/edit/auto-entry/delete/:id', edit.getDeleteAutoEntry);

//Edit cycle entries
app.get('/edit/cycle-entry/:id', edit.getEditCycleEntry);
app.post('/edit/cycle-entry/:id', edit.postEditCycleEntry);
app.get('/edit/cycle-entry/delete/:id', edit.getDeleteCycleEntry);

//Edit pit
app.get('/edit/pit/:id', edit.getEditPit);
app.post('/edit/pit/:id', edit.postEditPit);
app.get('/edit/pit/delete/:id', edit.getDeletePit);

//Image entry
app.get('/image-entry', image.get);
app.post('/image-entry', image.post);

//Video entry
app.get('/video-entry', video.get);
app.post('/video-entry', video.post);

//Pit
app.get('/pit', pit.get);
app.post('/pit', pit.post);

//Match Entry
app.get('/auto-entry', autoEntry.get);
app.post('/auto-entry', autoEntry.post);
app.get('/cycle-entry', cycleEntry.get);
app.post('/cycle-entry', cycleEntry.post);
app.get('/cycle-entry/:team/:match/:possession', cycleEntry.getWithValues);
app.post('/cycle-entry/:team/:match/:possession', cycleEntry.postWithValues);

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
app.get('/configure', configuration.getConfiguration);
app.post('/configure', configuration.postConfiguration);
app.get('/data-upload', pull.getUpload);
app.post('/data-upload', pull.postUpload);

//Averages Table
app.get('/table', table.table);

//Event Initialization
app.get('/new-event', newEvent.getInitialize);
app.post('/new-event', newEvent.postInitialize);

//TBA
//app.get('/tba/:key', tba.getEventDetails);



http.createServer(app).listen(app.get('port'), function(){
	if(app.get('port') != '80'){
		console.log('Gemini is up and running!  Navigate to http://localhost:' + app.get('port') + ' to access it.');	
	}else{
		console.log('Gemini is up and running!  Navigate to http://localhost to access it.');
	}
	
});
