exports.getMatchDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB(config.currentEvent+".match");
};

exports.getPitDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB(config.currentEvent+".pit");
};

exports.getScheduleDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB(config.currentEvent+".schedule");
};

exports.getAveragesDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB(config.currentEvent+".averages");
};

exports.getStdDevDatabase = function() {
	var config = require('../config.json');
	var JSONDB = require('brennonbrimhall-jsondb');
	return new JSONDB(config.currentEvent+".stddev");
};

exports.getEventConfig = function() {
	var config = require('../config.json');
	var eventConfig = require("../"+config.currentEvent+".json");
	return eventConfig;
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