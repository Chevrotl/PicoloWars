var TABLE_INFO = {'hauteur' : 0, 'largeur':0}

var SELF_PLAYER ;

var OTHER_PLAYERS = {}

//structure : 
// {
// hauteur : int,
// largeur : int,
// cases : [{
// 	x : int,
// 	y : int,
// 	bloc : bool,
// 	img : string,
// 	}]
// }
var JSON_TABLE = {
	"hauteur" : 30,
	"largeur" : 45,
	"cases" : [{
		x:0,
		y:0,
		bloc:false,
		img:"backgroundGreen.png"
	}]
}; 