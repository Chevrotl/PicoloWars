var TABLE_INFO = {'hauteur' : 0, 'largeur':0}

//Struct : 
//{
//id_player : player
//}
var LIST_OF_PLAYER = {}

//Struct : 
//{
//id_game : {map:jsonMap, players:{list player}}
//}
var LIST_OF_GAMES = {}

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

exports.TABLE_INFO = TABLE_INFO;
exports.LIST_OF_PLAYER = LIST_OF_PLAYER;
exports.LIST_OF_GAMES = LIST_OF_GAMES;