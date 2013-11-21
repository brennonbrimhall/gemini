exports.main = function (data) {
	
	var made = 0;
	var missed = 0;
	
	for(var i = 0; i<data.length; i++){
		made += Number(data[i]['Auto High']);
		made += Number(data[i]['Auto Middle']);
		made += Number(data[i]['Auto Low']);
		missed += Number(data[i]['Auto Miss']);
	}
	
	if((made+missed) !== 0){
		var accuracy = ((made)/(made+missed))*100;
		return accuracy.toFixed(2)+'%';
	}else{
		return null;
	}
};