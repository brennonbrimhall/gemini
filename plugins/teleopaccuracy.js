exports.main = function (data) {
	
	var made = 0;
	var missed = 0;
	
	for(var i = 0; i<data.length; i++){
		made += Number(data[i]['Teleop High']);
		made += Number(data[i]['Teleop Middle']);
		made += Number(data[i]['Teleop Low']);
		missed += Number(data[i]['Teleop Miss']);
	}
	
	if((made+missed) !== 0){
		var accuracy = ((made)/(made+missed))*100;
		return accuracy.toFixed(2)+'%';
	}else{
		return null;
	}
};