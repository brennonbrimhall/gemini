exports.getMatchDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB("./data/"+config.currentEvent+".match");
};

exports.getMatchData = function() {
	var config = require('../config.json');
	var fs = require('fs');
	return JSON.parse(fs.readFileSync("./data/"+config.currentEvent+".match"));
};

exports.getPitDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB("./data/"+config.currentEvent+".pit");
};

exports.getPitData = function() {
	var config = require('../config.json');
	var fs = require('fs');
	return JSON.parse(fs.readFileSync("./data/"+config.currentEvent+".pit"));
};

exports.getScheduleDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB("./data/"+config.currentEvent+".schedule");
};

exports.getScheduleData = function() {
	var config = require('../config.json');
	var fs = require('fs');
	return JSON.parse(fs.readFileSync("./data/"+config.currentEvent+".schedule"));
};

exports.getAveragesDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB("./data/"+config.currentEvent+".averages");
};

exports.getAveragesData = function() {
	var config = require('../config.json');
	var fs = require('fs');
	return JSON.parse(fs.readFileSync("./data/"+config.currentEvent+".averages"));
};

exports.getStdDevDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB("./data/"+config.currentEvent+".stddevs");
};

exports.getStdDevData = function() {
	var config = require('../config.json');
	var fs = require('fs');
	return JSON.parse(fs.readFileSync("./data/"+config.currentEvent+".stddevs"));
};

exports.getEventConfig = function() {
	var config = require('../config.json');
	var eventConfig = require("../data/"+config.currentEvent+".json");
	return eventConfig;
};

exports.getSystemConfig = function() {
	var config = require('../config.json');
	return config;
};

exports.saveSystemConfig = function(data) {
	var fs = require('fs');
	fs.writeFileSync('config.json', JSON.stringify(data));
};

exports.getCurrentEvent = function() {
	var config = require('../config.json');
	return config.currentEvent;
};

exports.switchEvent = function(eventCode){
	var config = require('../config.json');
	var fs = require('fs');
	
	//Verifying that the event to switch to exists
	var found = false;
	
	for(var i = 0; i < config.events; ++i){
		if(config.events[i] == eventCode){
			found = true;
		}
	}
	
	if(!found){
		throw "Event requrested does not exist.";
	}else{
		fs.writeFileSync('config.json.backup', JSON.stringify(config));
		config.currentEvent = eventCode;
		fs.writeFileSync('config.json', JSON.stringify(config));
	}
};