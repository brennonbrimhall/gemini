exports.process = function(pluginName, matchData) {
	var plugin = require('../plugins/'+pluginName);
	return plugin.main(matchData);
};