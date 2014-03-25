var overview = [
			{
				name: "Left Start",
				field: "leftStartingPercent"
			},
			{
				name: "Middle Positions",
				field: "middleStartingPercent"
			},
			{
				name: "Right Positions",
				field: "rightStartingPercent"
			},
			{
				name: "Goalie Positions",
				field: "goalieStartingPercent"
			},
			{
				name: "Starting Positions",
				field: "startingPositions"
			},
			{
				name: "Mobility Percentage",
				field: "mobilityPercentage"
			},
			{
				name: "Average Auto High Goals",
				field: "autoHighGoals"
			},
			{
				name: "Average Auto Low Goals",
				field: "autoLowGoals"
			},
			{
				name: "Hot Shots",
				field: 'autoHotShots'
			},
			{
				name: "Average Shots Blocked in Auto",
				field: "averageShotsBlocked"
			},
			{
				name: "Receptions from Human Player",
				field: "receptionsFromHumanPlayer"
			},
			{
				name: "Receptions from Floor",
				field: "receptionsFromFloor"
			},
			{
				name: "Receptions from Robot-to-Robot",
				field: "receptionsFromRobotToRobot"
			},
			{
				name: "Receptions from Catch from Truss",
				field: "receptionsFromCatch"
			},
			{
				name: "Receptions from Catch, no Truss",
				field: "receptionsFromCatchNoTruss"
			},
			{
				name: "Average Time per Posession",
				field: "averageTimePerPossession"
			},
			{
				name: "Average Possessions per Match",
				field: "averagePossessionsPerMatch"
			},
			{
				name: "Truss Accuracy",
				field: "trussAccuracy"
			},
			{
				name: "High Goal Accuracy",
				field: "highGoalAccuracy"
			},
			{
				name: "Low Goal Accuracy",
				field: "lowGoalAccuracy"
			}
		];

var tableOverview = [
			{
				name: "Left %",
				field: "leftPositionPercentage"
			},
			{
				name: "Middle %",
				field: "middlePositionPercentage"
			},
			{
				name: "Right %",
				field: "rightPositionPercentage"
			},
			{
				name: "Goalie %",
				field: "leftPositionPercentage"
			},
			{
				name: "Mobility",
				field: "mobilityPercentage"
			},
			{
				name: "AHG",
				field: "averageAutoHighGoals"
			},
			{
				name: "AHGA",
				field: "averageAutoHighGoalsAccuracy"
			},
			{
				name: "ALG",
				field: "averageAutoLowGoals"
			},
			{
				name: "ALGA",
				field: "averageAutoLowGoalsAccuracy"
			},
			{
				name: "Hot",
				field: 'averageAutoHotShots'
			},
			{
				name: "% Hot",
				field: 'autoHotShotsPercentage'
			},
			{
				name: "SBiA",
				field: "averageShotsBlocked"
			},
			{
				name: "HP R",
				field: "averageReceptionsFromHumanPlayer"
			},
			{
				name: "HP R%",
				field: "percentReceptionsFromHumanPlayer"
			},
			{
				name: "Floor R",
				field: "averageReceptionsFromFloor"
			},
			{
				name: "Floor R%",
				field: "percentReceptionsFromFloor"
			},
			{
				name: "Robot-to-Robot R",
				field: "averageReceptionsFromRobotToRobot"
			},
			{
				name: "Robot-to-Robot %R",
				field: "percentReceptionsFromRobotToRobot"
			},
			{
				name: "Catch from Truss R",
				field: "averageReceptionsFromCatch"
			},
			{
				name: "Catch from Truss R%",
				field: "percentReceptionsFromCatch"
			},
			{
				name: "Catch, no Truss R",
				field: "averageReceptionsFromCatchNoTruss"
			},
			{
				name: "Catch, no Truss R%",
				field: "percentReceptionsFromCatchNoTruss"
			},
			{
				name: "TPP",
				field: "averageTimePerPossession"
			},
			{
				name: "APM",
				field: "averagePossessionsPerMatch"
			},
			{
				name: "Truss Accuracy",
				field: "trussAccuracy"
			},
			{
				name: "HG Accuracy",
				field: "highGoalAccuracy"
			},
			{
				name: "LG Accuracy",
				field: "lowGoalAccuracy"
			}
		];

exports.getOverview = function(){
		return overview;
};

exports.getTableOverview = function(){
	return tableOverview;
};

exports.tableCaclulateForTeam = function(team){
	var eventHelper = require('../helpers/eventHelper');
	var cycledb = eventHelper.getCycleDatabase();
	var autodb = eventHelper.getAutoDatabase();
	
	return tableCalculate(autodb.select('team', team.toString()), cycledb.select('team', team.toString()));
};

exports.calculateForTeam = function(team){
	var eventHelper = require('../helpers/eventHelper');
	var cycledb = eventHelper.getCycleDatabase();
	var autodb = eventHelper.getAutoDatabase();
	
	return calculate(autodb.select('team', team.toString()), cycledb.select('team', team.toString()));
};

exports.tableCalculate = tableCalculate;
exports.calculate = calculate;

function tableCalculate (autoData, cycleData){
	var overview = {};
	
	overview.leftPositionPercentage = leftPositionPercentage(autoData);
	overview.middlePositionPercentage = middlePositionPercentage(autoData);
	overview.rightPositionPercentage = rightPositionPercentage(autoData);
	overview.goaliePositionPercentage = goaliePositionPercentage(autoData);
	
	overview.mobilityPercentage = mobilityPercentage(autoData);
	
	overview.averageAutoHighGoals = averageAutoHighGoal(autoData);
	overview.autoHighGoalsAccuracy = autoHighGoalAccuracy(autoData);
	overview.averageAutoLowGoals = averageAutoLowGoal(autoData);
	overview.autoLowGoalsAccuracy = autoLowGoalAccuracy(autoData);
	
	overview.averageAutoHotShots = averageHotShots(autoData);
	overview.autoHotShotsPercentage = hotShotsPercentage(autoData);
	
	overview.averageShotsBlocked = averageAutoBlockedShots(autoData);
	
	overview.averageReceptionsFromHumanPlayer = averageReceptionsFromHumanPlayer(autoData, cycleData);
	overview.averageReceptionsFromFloor = averageReceptionsFromFloor(autoData, cycleData);
	overview.averageReceptionsFromRobotToRobot = averageReceptionsFromRobotToRobot(autoData, cycleData);
	overview.averageReceptionsFromCatch = averageReceptionsFromCatch(autoData, cycleData);
	overview.averageReceptionsFromCatchNoTruss = averageReceptionsCatchNoTruss(autoData, cycleData);
	
	overview.percentReceptionsFromHumanPlayer = percentReceptionsFromHumanPlayer(autoData, cycleData);
	overview.percentReceptionsFromFloor = percentReceptionsFromFloor(autoData, cycleData);
	overview.percentReceptionsFromRobotToRobot = percentReceptionsFromRobotToRobot(autoData, cycleData);
	overview.percentReceptionsFromCatch = percentReceptionsFromCatch(autoData, cycleData);
	overview.percentReceptionsFromCatchNoTruss = percentReceptionsCatchNoTruss(autoData, cycleData);
	
	overview.averageTimePerPossession = averageTimePerPossession(autoData, cycleData);
	overview.averagePossessionsPerMatch = averagePossessionsPerMatch(autoData, cycleData);
	
	overview.trussAccuracy = trussAccuracy(autoData, cycleData);
	overview.highGoalAccuracy = highGoalAccuracy(autoData, cycleData);
	overview.lowGoalAccuracy = lowGoalAccuracy(autoData, cycleData);
	
	return overview;
}

function calculate(autoData, cycleData){
	var overview = {};
	
	if(autoData.length > 0){
		overview.leftStartingPercent = leftPositionPercentage(autoData);
		overview.middleStartingPercent = middlePositionPercentage(autoData);
		overview.rightStartingPercent = rightPositionPercentage(autoData);
		overview.goalieStartingPercent = goaliePositionPercentage(autoData);
	}else{
		overview.startingPositions = '';
	}
	
	overview.mobilityPercentage = mobilityPercentage(autoData);
	
	if(averageAutoHighGoal(autoData) !== ''){
		overview.autoHighGoals = averageAutoHighGoal(autoData)+' @ '+autoHighGoalAccuracy(autoData);
	}else{
		overview.autoHighGoals = '';
	}
	
	if(averageAutoLowGoal(autoData) !== ''){
		overview.autoLowGoals = averageAutoLowGoal(autoData)+' @ '+autoLowGoalAccuracy(autoData);
	}
	
	if(hotShotsPercentage(autoData) !== ''){
		overview.autoHotShots = averageHotShots(autoData)+' ('+hotShotsPercentage(autoData)+')';
	}else{
		overview.autoHotShots = '';
	}
	
	overview.averageShotsBlocked = averageAutoBlockedShots(autoData);
	
	if(percentReceptionsFromHumanPlayer(autoData, cycleData) !== ''){
		overview.receptionsFromHumanPlayer = averageReceptionsFromHumanPlayer(autoData, cycleData)+' @ '+percentReceptionsFromHumanPlayer(autoData, cycleData);
	}else{
		overview.receptionsFromHumanPlayer = '';
	}
	
	if(percentReceptionsFromFloor(autoData, cycleData) !== ''){
		overview.receptionsFromFloor = averageReceptionsFromFloor(autoData, cycleData)+' @ '+percentReceptionsFromFloor(autoData, cycleData);
	}else{
		overview.receptionsFromFloor = '';
	}
	
	if(percentReceptionsFromRobotToRobot(autoData, cycleData) !== ''){
		overview.receptionsFromRobotToRobot = averageReceptionsFromRobotToRobot(autoData, cycleData)+' @ '+percentReceptionsFromRobotToRobot(autoData, cycleData);
	}else{
		overview.receptionsFromRobotToRobot = '';
	}
	
	if(percentReceptionsFromCatch(autoData, cycleData) !== ''){
		overview.receptionsFromCatch = averageReceptionsFromCatch(autoData, cycleData)+' @ '+percentReceptionsFromCatch(autoData, cycleData);
	}else{
		overview.receptionsFromCatch = '';
	}
	
	if(percentReceptionsCatchNoTruss(autoData, cycleData) !== ''){
		overview.receptionsFromCatchNoTruss = averageReceptionsCatchNoTruss(autoData, cycleData)+' @ '+percentReceptionsCatchNoTruss(autoData, cycleData);
	}else{
		overview.receptionsFromCatchNoTruss = '';
	}
	
	overview.averageTimePerPossession = averageTimePerPossession(autoData, cycleData);
	overview.averagePossessionsPerMatch = averagePossessionsPerMatch(autoData, cycleData);
	
	overview.trussAccuracy = trussAccuracy(autoData, cycleData);
	overview.highGoalAccuracy = highGoalAccuracy(autoData, cycleData);
	overview.lowGoalAccuracy = lowGoalAccuracy(autoData, cycleData);
	
	return overview;
}

function leftPositionPercentage(autoData){

	//Position relative frequency
	if(autoData.length > 0){
		var left = 0;
		
		for(var i = 0; i < autoData.length; i++){
			if(autoData[i].startPosition == '1'){
				left++;
			}
		}
		
		//Getting percentages
		left = ((left/autoData.length).toFixed(2))*100;
		
		return left+'%';
	}else{
		return '';
	}
}

function middlePositionPercentage(autoData){

	//Position relative frequency
	if(autoData.length > 0){
		var middle = 0;
		
		for(var i = 0; i < autoData.length; i++){
			if(autoData[i].startPosition == '2'){
				middle++;
			}
		}
		
		//Getting percentages
		middle = ((middle/autoData.length).toFixed(2))*100;
		
		return middle+'%';
	}else{
		return '';
	}
}

function rightPositionPercentage(autoData){

	//Position relative frequency
	if(autoData.length > 0){
		var right = 0;
		
		for(var i = 0; i < autoData.length; i++){
			if(autoData[i].startPosition == '3'){
				right++;
			}
		}
		
		//Getting percentages
		right = ((right/autoData.length).toFixed(2))*100;
		
		return right+'%';
	}else{
		return '';
	}
}

function goaliePositionPercentage(autoData){

	//Position relative frequency
	if(autoData.length > 0){
		var goalie = 0;
		
		for(var i = 0; i < autoData.length; i++){
			if(autoData[i].startPosition == '4'){
				goalie++;
			}
		}
		
		//Getting percentages
		goalie = ((goalie/autoData.length).toFixed(2))*100;
		
		return goalie+'%';
	}else{
		return '';
	}
}

function mobilityPercentage(autoData){
	
	//Mobility percentage when in white zone
	var mobilityEarned = 0, chancesForMobility = 0;
	for(var i = 0; i < autoData.length; i++){
		if(autoData[i].startPosition == '1'){
			chancesForMobility++;
		}else if(autoData[i].startPosition == '2'){
			chancesForMobility++;
		}else if(autoData[i].startPosition == '3'){
			chancesForMobility++;
		}
		
		if(autoData[i].mobilityEarned == '1'){
			mobilityEarned++;
		}
	}
	
	if(chancesForMobility > 0){
		return ''+((mobilityEarned/chancesForMobility).toFixed(2))*100+'%';
	}else{
		return '';
	}
}	

function averageAutoHighGoal(autoData){	
	//Average high goals made when not in goalie zone at percentage
	
	var chancesForHighGoal = 0, highGoals = 0, highGoalMisses = 0;
	for(var i = 0; i < autoData.length; i++){
		if(autoData[i].startPosition == '1'){
			chancesForHighGoal++;
		}else if(autoData[i].startPosition == '2'){
			chancesForHighGoal++;
		}else if(autoData[i].startPosition == '3'){
			chancesForHighGoal++;
		}
		
		if(Number(autoData[i].missedHigh)){
			highGoalMisses += Number(autoData[i].missedHigh);
		}
		
		if(Number(autoData[i].highScored)){
			highGoals += Number(autoData[i].highScored);
		}
		
	}
	
	if(highGoals+highGoalMisses > 0) {
		return (highGoals/chancesForHighGoal).toFixed(2);
	}else{
		return '';
	}
}

function autoHighGoalAccuracy(autoData){	
	//Average high goals made when not in goalie zone at percentage
	
	var chancesForHighGoal = 0, highGoals = 0, highGoalMisses = 0;
	for(var i = 0; i < autoData.length; i++){
		if(autoData[i].startPosition == '1'){
			chancesForHighGoal++;
		}else if(autoData[i].startPosition == '2'){
			chancesForHighGoal++;
		}else if(autoData[i].startPosition == '3'){
			chancesForHighGoal++;
		}
		
		if(Number(autoData[i].missedHigh)){
			highGoalMisses += Number(autoData[i].missedHigh);
		}
		
		if(Number(autoData[i].highScored)){
			highGoals += Number(autoData[i].highScored);
		}
		
	}
	
	if((highGoals+highGoalMisses) > 0) {
		return (highGoals/(highGoals+highGoalMisses)).toFixed(2)*100+'%';
	}else{
		return '';
	}
}

function averageAutoLowGoal(autoData){
	//Average low goals made when not in goalie zone at percentage
	
	var chancesForLowGoal = 0, lowGoals = 0, lowGoalMisses = 0;
	for(var i = 0; i < autoData.length; i++){
		if(autoData[i].startPosition == '1'){
			chancesForLowGoal++;
		}else if(autoData[i].startPosition == '2'){
			chancesForLowGoal++;
		}else if(autoData[i].startPosition == '3'){
			chancesForLowGoal++;
		}
		
		if(Number(autoData[i].missedLow)){
			lowGoalMisses += Number(autoData[i].missedLow);
		}
		
		if(Number(autoData[i].lowScored)){
			lowGoals += Number(autoData[i].lowScored);
		}
		
	}
	
	if(lowGoals+lowGoalMisses > 0){
		return (lowGoals/chancesForLowGoal).toFixed(2);
	}else{
		return '';
	}
	
}

function autoLowGoalAccuracy(autoData){
	//Average low goals made when not in goalie zone at percentage
	
	var chancesForLowGoal = 0, lowGoals = 0, lowGoalMisses = 0;
	for(var i = 0; i < autoData.length; i++){
		if(autoData[i].startPosition == '1'){
			chancesForLowGoal++;
		}else if(autoData[i].startPosition == '2'){
			chancesForLowGoal++;
		}else if(autoData[i].startPosition == '3'){
			chancesForLowGoal++;
		}
		
		if(Number(autoData[i].missedLow)){
			lowGoalMisses += Number(autoData[i].missedLow);
		}
		
		if(Number(autoData[i].lowScored)){
			lowGoals += Number(autoData[i].lowScored);
		}
		
	}
	
	if(lowGoals+lowGoalMisses > 0){
		return (lowGoals/(lowGoals+lowGoalMisses)).toFixed(2)*100+'%';
	}else{
		return '';
	}
	
}

function averageHotShots(autoData){
	//Average number of hot scores when not in goalie zone
	
	var chancesForHot = 0, hotGoals = 0, shotsMade = 0;
	for (var i = 0; i < autoData.length; i++) {
		if(autoData[i].startPosition == '1'){
			chancesForHot++;
		}else if(autoData[i].startPosition == '2'){
			chancesForHot++;
		}else if(autoData[i].startPosition == '3'){
			chancesForHot++;
		}
		
		if(Number(autoData[i].hotScores)) {
			hotGoals += Number(autoData[i].hotScores);
		}
		
		if(Number(autoData[i].lowScored)) {
			shotsMade += Number(autoData[i].lowScored);
		}
		
		if(Number(autoData[i].highScored)) {
			shotsMade += Number(autoData[i].lowScored);
		}
	}
	if(chancesForHot > 0){
		return (hotGoals/chancesForHot).toFixed(2);
	}else{
		return '';
	}
}

function hotShotsPercentage(autoData){
	//Average number of hot scores when not in goalie zone
	
	var chancesForHot = 0, hotGoals = 0, shotsMade = 0;
	for (var i = 0; i < autoData.length; i++) {
		if(autoData[i].startPosition == '1'){
			chancesForHot++;
		}else if(autoData[i].startPosition == '2'){
			chancesForHot++;
		}else if(autoData[i].startPosition == '3'){
			chancesForHot++;
		}
		
		if(Number(autoData[i].hotScores)) {
			hotGoals += Number(autoData[i].hotScores);
		}
		
		if(Number(autoData[i].lowScored)) {
			shotsMade += Number(autoData[i].lowScored);
		}
		
		if(Number(autoData[i].highScored)) {
			shotsMade += Number(autoData[i].highScored);
		}
	}
	
	if(shotsMade > 0){
		return (hotGoals/shotsMade).toFixed(2)*100+'%';
	}else{
		return '';
	}
}

function averageAutoBlockedShots(autoData){
	//Average number of shots blocked when in goalie zone
	
	var chancesForBlocking = 0, shotsBlocked = 0;
	for (var i = 0; i < autoData.length; i++) {
		if(autoData[i].startPosition == '4'){
			chancesForBlocking++;
		}
		
		if(Number(autoData[i].shotsBlocked)) {
			shotsBlocked += Number(autoData[i].hotScores);
		}
	}
	
	if(chancesForBlocking > 0){
		return (shotsBlocked/chancesForBlocking).toFixed(2);
	}else{
		return '';
	}
}

function averageReceptionsFromHumanPlayer(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var humanPlayerReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '2'){
			humanPlayerReceptions++;
		}
	}
	
	if(humanPlayerReceptions/autoData.length){
		return (humanPlayerReceptions/autoData.length).toFixed(2);
	}else{
		return '';
	}
}

function percentReceptionsFromHumanPlayer(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var humanPlayerReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '2'){
			humanPlayerReceptions++;
		}
	}
	
	if(humanPlayerReceptions/cycleData.length){
		return (humanPlayerReceptions/cycleData.length).toFixed(2)*100+'%';
	}else{
		return '';
	}
}

function averageReceptionsFromFloor(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var floorReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '3'){
			floorReceptions++;
		}
	}
	
	if(floorReceptions/autoData.length){
		return (floorReceptions/autoData.length).toFixed(2);
	}else{
		return '';
	}
}

function percentReceptionsFromFloor(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var floorReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '3'){
			floorReceptions++;
		}
	}
	
	if(floorReceptions/cycleData.length){
		return (floorReceptions/cycleData.length).toFixed(2)*100+'%';
	}else{
		return '';
	}
}

function averageReceptionsFromRobotToRobot(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var robotToRobotReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '4'){
			robotToRobotReceptions++;
		}
	}
	
	if(robotToRobotReceptions/autoData.length){
		return (robotToRobotReceptions/autoData.length).toFixed(2);
	}else{
		return '';
	}
}

function percentReceptionsFromRobotToRobot(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var robotToRobotReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '4'){
			robotToRobotReceptions++;
		}
	}
	
	if(robotToRobotReceptions/cycleData.length){
		return (robotToRobotReceptions/cycleData.length).toFixed(2)*100+'%';
	}else{
		return '';
	}
}

function averageReceptionsFromCatch(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var catchReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '5'){
			catchReceptions++;
		}
	}
	
	if(catchReceptions/autoData.length){
		return (catchReceptions/autoData.length).toFixed(2);
	}else{
		return '';
	}
}

function percentReceptionsFromCatch(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var catchReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '5'){
			catchReceptions++;
		}
	}
	
	if(catchReceptions/cycleData.length){
		return (catchReceptions/cycleData.length).toFixed(2)*100+'%';
	}else{
		return '';
	}
}

function averageReceptionsCatchNoTruss(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var catchNoTrussReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '4'){
			catchNoTrussReceptions++;
		}
	}
	if(catchNoTrussReceptions/autoData.length){
		return (catchNoTrussReceptions/autoData.length).toFixed(2);
	}else{
		return '';
	}
}

function percentReceptionsCatchNoTruss(autoData, cycleData){
	//Average number of receptions from human player per match
	
	var catchNoTrussReceptions = 0;
	
	for (var i = 0; i < cycleData.length; i++) {
		if(cycleData[i].recievedCode == '4'){
			catchNoTrussReceptions++;
		}
	}
	if(catchNoTrussReceptions/cycleData.length){
		return (catchNoTrussReceptions/cycleData.length).toFixed(2)*100+'%';
	}else{
		return '';
	}
}

function averageTimePerPossession(autoData, cycleData){
	
	if(cycleData.length > 0){
		var totalTime = 0;
		
		for(var i = 0; i < cycleData.length; i++){
			if(Number(cycleData[i].timeCode)){
				totalTime += Number(cycleData[i].timeCode);
			}
		}
		
		return (totalTime/cycleData.length).toFixed(2);
	}else{
		return '';
	}
}

function averagePossessionsPerMatch(autoData, cycleData){
	if((cycleData.length/autoData.length)){
		return (cycleData.length/autoData.length).toFixed(2);
	}else{
		return '';
	}
}

function trussAccuracy(autoData, cycleData){
	var successfulTrusses = 0, missedTrusses = 0;
	
	for(var i = 0; i < cycleData.length; i++){
		if(cycleData[i].resultCode == '4'){
			successfulTrusses++;
		}else if(cycleData[i].resultCode == '5'){
			successfulTrusses++;
		}else if(cycleData[i].resultCode == '6'){
			successfulTrusses++;
		}else if(cycleData[i].resultCode == '7'){
			missedTrusses++;
		}
	}
	
	if(successfulTrusses+missedTrusses > 0){
		return (successfulTrusses/(successfulTrusses+missedTrusses)).toFixed(2)*100+'%';
	}else{
		return '';
	}
}

function lowGoalAccuracy(autoData, cycleData){
	var successfulLowGoals = 0, missedLowGoals = 0;
	
	for(var i = 0; i < cycleData.length; i++){
		if(cycleData[i].resultCode == '10'){
			successfulLowGoals++;
		}else if(cycleData[i].resultCode == '11'){
			missedLowGoals++;
		}
	}
	
	if(successfulLowGoals+missedLowGoals > 0){
		return (successfulLowGoals/(successfulLowGoals+missedLowGoals)).toFixed(2)*100+'%';
	}else{
		return '';
	}
}

function highGoalAccuracy(autoData, cycleData){
	var successfulHighGoals = 0, missedHighGoals = 0;
	
	for(var i = 0; i < cycleData.length; i++){
		if(cycleData[i].resultCode == '8'){
			successfulHighGoals++;
		}else if(cycleData[i].resultCode == '9'){
			missedHighGoals++;
		}
	}
	
	if(successfulHighGoals+missedHighGoals > 0){
		return (successfulHighGoals/(successfulHighGoals+missedHighGoals)).toFixed(2)*100+'%';
	}else{
		return '';
	}
}