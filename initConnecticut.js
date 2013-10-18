var JSONDB = require('brennonbrimhall-jsondb');

var matchdb = new JSONDB('2013ctha.match', 
	['team', 'match', 'Auto High', 'Auto Middle', 'Auto Low', 'Auto Miss', 
	'Teleop High', 'Teleop Middle', 'Teleop Low', 'Teleop Pyramid', 'Teleop Miss', 'Discs over Auto Line', 'Block Shots', 'Speed', 
	'Climb Attempt', 'Climb Level', 
	'Illegal Actions']);
	
var averagesdb = new JSONDB('2013ctha.averages', 
	['team', 'Auto High', 'Auto Middle', 'Auto Low', 'Auto Miss', 
	'Teleop High', 'Teleop Middle', 'Teleop Low', 'Teleop Pyramid', 'Teleop Miss', 'Discs over Auto Line', 'Block Shots', 'Speed', 
	'Climb Attempt', 'Climb Level', 
	'Illegal Actions']);
	
var stdDevsdb = new JSONDB('2013ctha.stddev', 
	['team', 'Auto High', 'Auto Middle', 'Auto Low', 'Auto Miss', 
	'Teleop High', 'Teleop Middle', 'Teleop Low', 'Teleop Pyramid', 'Teleop Miss', 'Discs over Auto Line', 'Block Shots', 'Speed', 
	'Climb Attempt', 'Climb Level', 
	'Illegal Actions']);

var pitdb = new JSONDB('2013ctha.pit', 
	['team', 'role', 'drivetrain', 'blocker']);
	
var scheduledb = new JSONDB('2013ctha.schedule', 
	['match', 'red1', 'red2', 'red3', 'blue1', 'blue2', 'blue3', 'redScore', 'blueScore']);

function insertMatch(match, red1, red2, red3, blue1, blue2, blue3, redScore, blueScore){
	scheduledb.insert({'match': match, 'red1': red1, 'red2': red2, 'red3': red3, 
		'blue1': blue1, 'blue2': blue2, 'blue3': blue3, 
		'redScore': redScore, 'blueScore': blueScore});
}

insertMatch(1, 230, 3464, 1784, 4628, 1665, 2205, 86, 17);
insertMatch(2, 2170, 1991, 3182, 3059, 1027, 95, 65, 35);
insertMatch(3, 3461, 178, 3104, 999, 3555, 1699, 47, 2);
insertMatch(4, 3204, 571, 3525, 4055, 395, 173, 38, 32);
insertMatch(5, 4812, 1124, 2836, 1218, 558, 237, 9, 93);
insertMatch(6, 1071, 263, 3718, 228, 4254, 2064, 24, 100);
insertMatch(7, 4572, 694, 4097, 181, 839, 1289, 43, 45);
insertMatch(8, 4609, 1740, 2785, 175, 4134, 195, 2, 144);
insertMatch(9, 2168, 3146, 3719, 177, 3634, 236, 30, 107);
insertMatch(10, 20, 558, 3104, 2067, 3204, 230, 113, 93);
insertMatch(11, 4628, 178, 228, 4254, 1218, 95, 68, 31);
insertMatch(12, 3718, 2064, 2170, 3461, 1124, 181, 90, 24);
insertMatch(13, 4812, 1027, 839, 2836, 4609, 3464, 18, 16);
insertMatch(14, 1740, 999, 1784, 571, 2785, 3719, 45, 36);
insertMatch(15, 395, 694, 3634, 175, 20, 2168, 53, 116);
insertMatch(16, 173, 4134, 236, 1699, 3059, 4572, 116, 52);
insertMatch(17, 3182, 3555, 1071, 195, 3525, 4097, 28, 86);
insertMatch(18, 177, 4055, 263, 1665, 1991, 1289, 82, 49);
insertMatch(19, 3146, 2205, 999, 237, 2067, 181, 13, 55);
insertMatch(20, 4628, 2064, 558, 178, 839, 395, 54, 58);
insertMatch(21, 173, 230, 2170, 2785, 228, 4812, 73, 77);
insertMatch(22, 3182, 4572, 571, 3634, 3464, 3718, 26, 42);
insertMatch(23, 20, 3555, 1218, 3719, 4254, 236, 125, 32);
insertMatch(24, 4055, 3461, 1740, 2205, 2168, 1027, 20, 32);
insertMatch(25, 2836, 3146, 3104, 263, 4097, 4609, 32, 26);
insertMatch(26, 3525, 237, 1699, 694, 1784, 1991, 53, 95);
insertMatch(27, 4134, 1289, 95, 3204, 1665, 195, 64, 74);
insertMatch(28, 3059, 1071, 2067, 175, 177, 1124, 66, 102);
insertMatch(29, 4055, 2168, 4254, 2064, 999, 4572, 39, 50);
insertMatch(30, 3555, 181, 2836, 228, 20, 571, 12, 124);
insertMatch(31, 4097, 237, 178, 4609, 230, 236, 57, 76);
insertMatch(32, 3146, 3525, 1665, 3718, 1740, 4628, 51, 16);
insertMatch(33, 3719, 263, 2205, 173, 694, 4812, 9, 89);
insertMatch(34, 1784, 1071, 1218, 2170, 3634, 4134, 64, 53);
insertMatch(35, 1124, 1991, 3204, 3182, 175, 839, 50, 98);
insertMatch(36, 2785, 1027, 195, 177, 558, 1699, 51, 92);
insertMatch(37, 3464, 1289, 3461, 3104, 2067, 95, 62, 71);
insertMatch(38, 395, 4254, 2836, 3059, 230, 1740, 2, 95);
insertMatch(39, 4055, 1784, 20, 3718, 4609, 173, 116, 26);
insertMatch(40, 3204, 3634, 175, 4628, 4097, 999, 41, 35);
insertMatch(41, 2205, 571, 2064, 1027, 1699, 1991, 39, 66);
insertMatch(42, 236, 4572, 4812, 3461, 1665, 1071, 53, 37);
insertMatch(43, 3719, 228, 3059, 2168, 195, 3464, 70, 176);
insertMatch(44, 839, 2067, 1218, 263, 95, 2785, 123, 30);
insertMatch(45, 4134, 694, 3146, 1124, 558, 3555, 128, 56);
insertMatch(46, 178, 3525, 2170, 237, 1289, 177, 127, 91);
insertMatch(47, 181, 395, 236, 3182, 3104, 1784, 48, 36);
insertMatch(48, 2836, 1699, 228, 3204, 4572, 3719, 91, 4);
insertMatch(49, 1665, 20, 999, 839, 3059, 2064, 106, 67);
insertMatch(50, 4134, 1991, 4097, 2067, 2168, 3718, 65, 119);
insertMatch(51, 263, 1027, 3464, 175, 3555, 178, 65, 65);
insertMatch(52, 237, 2785, 1071, 395, 3461, 4628, 33, 42);
insertMatch(53, 4609, 3525, 558, 4254, 2205, 2170, 67, 56);
insertMatch(54, 195, 3104, 4812, 4055, 3634, 1124, 109, 31);
insertMatch(55, 177, 95, 230, 181, 694, 571, 105, 94);
insertMatch(56, 1218, 173, 1289, 3182, 1740, 3146, 71, 57);
insertMatch(57, 228, 2067, 4097, 1699, 1665, 395, 118, 72);
insertMatch(58, 3464, 558, 999, 1991, 236, 1071, 63, 94);
insertMatch(59, 3634, 3719, 839, 3461, 4134, 3525, 22, 63);
insertMatch(60, 2168, 181, 3204, 263, 178, 4812, 59, 45);
insertMatch(61, 2785, 1124, 1289, 4254, 20, 1027, 2, 64);
insertMatch(62, 230, 571, 195, 4572, 2170, 3146, 156, 55);
insertMatch(63, 4628, 694, 237, 4055, 3182, 3059, 26, 100);
insertMatch(64, 175, 2836, 95, 173, 1784, 2064, 78, 59);
insertMatch(65, 177, 3718, 1218, 3555, 2205, 3104, 132, 30);
insertMatch(66, 4609, 3204, 1699, 1740, 1071, 3464, 54, 58);
insertMatch(67, 20, 2170, 395, 4572, 263, 4134, 114, 20);
insertMatch(68, 1027, 3525, 1124, 999, 230, 228, 32, 87);
insertMatch(69, 2067, 4254, 195, 571, 839, 1784, 75, 70);
insertMatch(70, 4055, 3718, 175, 558, 178, 3719, 82, 47);
insertMatch(71, 3461, 1991, 3059, 4097, 1218, 3146, 56, 112);
insertMatch(72, 3555, 173, 95, 3634, 2168, 237, 33, 80);
insertMatch(73, 4812, 1740, 2064, 177, 694, 3104, 38, 140);
insertMatch(74, 2205, 236, 1289, 4628, 2785, 2836, 65, 18);
insertMatch(75, 1665, 4609, 2067, 3182, 181, 3719, 72, 30);
insertMatch(76, 1784, 263, 228, 230, 558, 3461, 81, 68);
insertMatch(77, 173, 20, 1991, 1071, 195, 178, 67, 64);
insertMatch(78, 1699, 4254, 175, 237, 4812, 3146, 61, 62);
insertMatch(79, 839, 4628, 2168, 2170, 3104, 571, 73, 30);
insertMatch(80, 2064, 3464, 181, 3525, 1218, 2785, 42, 106);
insertMatch(81, 177, 3182, 4134, 2836, 4055, 999, 86, 21);
insertMatch(82, 1665, 3718, 236, 1027, 694, 3204, 97, 56);
insertMatch(83, 395, 3059, 4609, 3634, 1289, 3555, 46, 45);
insertMatch(84, 4572, 1740, 2205, 4097, 1124, 95, 2, 28);

matchdb.save();
averagesdb.save();
stdDevsdb.save();
pitdb.save();
scheduledb.save();